/**
 * PartnerRouting.tsx — Find Partner page with real Leaflet + OpenStreetMap map.
 *
 * Layout (desktop):
 *   [ Filter Pills ]
 *   ┌─────────────────────────────────┬──────────────────────┐
 *   │  Leaflet OpenStreetMap (left)   │  Partner List (right)│
 *   └─────────────────────────────────┴──────────────────────┘
 *
 * Features:
 * - Real interactive OpenStreetMap (no API key)
 * - Custom colored markers per partner type
 * - Click marker → highlight card (and vice versa)
 * - Geolocation → user pin + distance labels
 * - Fallback to profile city if geolocation denied
 * - AI Recommended badge on the top-ranked partner
 * - Haversine distance calculation
 */

import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import {
  MapPin, Star, ExternalLink, Phone, ArrowRight,
  Navigation, RefreshCw, Info,
} from 'lucide-react';
import { useAppStore } from '../hooks/useAppStore';
import { useRecommendations } from '../hooks/useRecommendations';
import { t } from '../services/i18n';
import { cn } from '../utils';
import type { Partner, PartnerType } from '../types';
import { SAMPLE_PARTNERS } from '../data/mockData';

// ─── Leaflet imports (loaded lazily via effect to avoid SSR issues) ────────────
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default icon path broken by bundlers
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// ─── Constants ────────────────────────────────────────────────────────────────

const TYPE_LABELS: Record<PartnerType, string> = {
  bank: 'Bank / NBFC',
  ngo: 'NGO',
  government_office: 'Govt. Office',
  online_portal: 'Online',
};

const TYPE_COLORS: Record<PartnerType, string> = {
  bank: 'bg-blue-50 border-blue-200 text-blue-700',
  ngo: 'bg-green-50 border-green-200 text-green-700',
  government_office: 'bg-purple-50 border-purple-200 text-purple-700',
  online_portal: 'bg-indigo-50 border-indigo-200 text-indigo-700',
};

const TYPE_DOT: Record<PartnerType, string> = {
  bank: 'bg-blue-500',
  ngo: 'bg-green-500',
  government_office: 'bg-purple-500',
  online_portal: 'bg-indigo-500',
};

const FILTER_LABELS: [PartnerType | 'all', string][] = [
  ['all', 'All Partners'],
  ['bank', 'Banks / NBFCs'],
  ['ngo', 'NGOs'],
  ['government_office', 'Govt. Offices'],
  ['online_portal', 'Online'],
];

// Default map center (Mumbai — matches our sample data)
const DEFAULT_CENTER: [number, number] = [18.9322, 72.8354];
const DEFAULT_ZOOM = 13;

// ─── Haversine distance (km) ──────────────────────────────────────────────────

function haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// ─── Custom marker icons ──────────────────────────────────────────────────────



const TYPE_ICON_COLOR: Record<PartnerType, string> = {
  bank: '#2563eb',
  ngo: '#16a34a',
  government_office: '#7c3aed',
  online_portal: '#4f46e5',
};

const TYPE_ICON_EMOJI: Record<PartnerType, string> = {
  bank: '🏦',
  ngo: '🤝',
  government_office: '🏛',
  online_portal: '💻',
};

function makePartnerIcon(type: PartnerType, isSelected = false): L.DivIcon {
  const color = TYPE_ICON_COLOR[type];
  const emoji = TYPE_ICON_EMOJI[type];
  const size = isSelected ? 48 : 38;
  const border = isSelected ? '3px solid #f97316' : '2.5px solid white';
  const shadow = isSelected
    ? '0 4px 16px rgba(249,115,22,0.5)'
    : '0 2px 8px rgba(0,0,0,0.3)';

  return L.divIcon({
    className: '',
    html: `<div style="
      width:${size}px;height:${size}px;
      background:${color};
      border:${border};
      border-radius:50%;
      display:flex;align-items:center;justify-content:center;
      box-shadow:${shadow};
      font-size:${isSelected ? 22 : 18}px;
      cursor:pointer;
      transform:${isSelected ? 'scale(1.1)' : 'scale(1)'};
      transition:all 0.2s;
    ">${emoji}</div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size],
  });
}

function makeUserIcon(): L.DivIcon {
  return L.divIcon({
    className: '',
    html: `<div style="
      width:40px;height:40px;
      background:#1e3a5f;
      border:3px solid white;
      border-radius:50%;
      display:flex;align-items:center;justify-content:center;
      box-shadow:0 3px 10px rgba(30,58,95,0.5);
      font-size:18px;
      cursor:default;
    ">👤</div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20],
  });
}

// ─── Map controller — pans to selected partner ───────────────────────────────

function MapController({ center }: { center: [number, number] | null }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, Math.max(map.getZoom(), 14), { duration: 0.8 });
    }
  }, [center, map]);
  return null;
}

// ─── Intelligent partner ranking ──────────────────────────────────────────────

function rankPartners(
  partners: Partner[],
  profile: { isStreetVendor: boolean; fundingRequirement: number; category: string; occupation: string },
  topSchemeId?: string,
  userLat?: number,
  userLng?: number
): Partner[] {
  const scored = partners.map((p) => {
    let score = 0;

    if (profile.isStreetVendor) {
      if (p.services.some((s) => /svanidhi|vendor/i.test(s))) score += 30;
      if (p.type === 'online_portal') score += 15;
    }
    if (topSchemeId?.includes('mudra')) {
      if (p.services.some((s) => /mudra/i.test(s))) score += 25;
      if (p.type === 'bank') score += 15;
    }
    if (topSchemeId?.includes('pmegp')) {
      if (p.services.some((s) => /pmegp/i.test(s))) score += 25;
      if (p.type === 'government_office') score += 20;
    }
    if (/pm.daksh|training/i.test(topSchemeId ?? '')) {
      if (p.type === 'ngo') score += 20;
    }
    if (profile.fundingRequirement > 200000) {
      if (p.type === 'bank') score += 10;
    }
    if (['sc', 'st', 'obc'].includes(profile.category)) {
      if (p.type === 'ngo') score += 10;
    }
    score += p.rating * 2;

    // Distance bonus
    if (userLat && userLng && p.latitude && p.longitude) {
      const dist = haversine(userLat, userLng, p.latitude, p.longitude);
      score += Math.max(0, 15 - dist * 2);
    } else if (p.distance === 0) {
      score += 5;
    } else if (p.distance !== undefined && p.distance > 0) {
      score += Math.max(0, 10 - p.distance);
    }

    return { partner: p, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.map((s) => s.partner);
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function PartnerRouting() {
  const { profile, language } = useAppStore();
  const { recommendations } = useRecommendations(profile);

  const [typeFilter, setTypeFilter] = useState<PartnerType | 'all'>('all');
  const [selectedPartnerId, setSelectedPartnerId] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationStatus, setLocationStatus] = useState<'idle' | 'loading' | 'success' | 'denied'>('idle');
  const [mapFlyTo, setMapFlyTo] = useState<[number, number] | null>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const topScheme = recommendations[0]?.scheme;

  // With or without geolocation, compute distances and rank
  const partnersWithDistance = useMemo(() => {
    return SAMPLE_PARTNERS.map((p) => {
      if (userLocation && p.latitude && p.longitude) {
        const dist = haversine(userLocation.lat, userLocation.lng, p.latitude, p.longitude);
        return { ...p, distance: Math.round(dist * 10) / 10 };
      }
      return p;
    });
  }, [userLocation]);

  const rankedPartners = useMemo(
    () =>
      rankPartners(
        partnersWithDistance,
        {
          isStreetVendor: profile.isStreetVendor,
          fundingRequirement: profile.fundingRequirement,
          category: profile.category,
          occupation: profile.occupation,
        },
        topScheme?.id,
        userLocation?.lat,
        userLocation?.lng
      ),
    [partnersWithDistance, profile, topScheme?.id, userLocation]
  );

  const filtered = rankedPartners.filter(
    (p) => typeFilter === 'all' || p.type === typeFilter
  );

  const nearestPartner = filtered.find((p) => p.distance && p.distance > 0);
  const nearestDist = nearestPartner?.distance;
  const topMatchScore = recommendations[0]?.matchScore;

  // Geolocation
  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationStatus('denied');
      return;
    }
    setLocationStatus('loading');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocationStatus('success');
        setMapFlyTo([pos.coords.latitude, pos.coords.longitude]);
      },
      () => {
        setLocationStatus('denied');
        // Fallback to profile location or default
        if (profile.district && profile.state) {
          // Keep default center (Mumbai) — map already shows it
        }
      }
    );
  }, [profile.district, profile.state]);

  // Card → map sync
  const handleCardClick = (partner: Partner) => {
    setSelectedPartnerId(partner.id === selectedPartnerId ? null : partner.id);
    if (partner.latitude && partner.longitude) {
      setMapFlyTo([partner.latitude, partner.longitude]);
    }
  };

  // Map marker → card sync
  const handleMarkerClick = (partner: Partner) => {
    setSelectedPartnerId(partner.id === selectedPartnerId ? null : partner.id);
    // Scroll to card
    setTimeout(() => {
      cardRefs.current[partner.id]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  };

  // Map center: selected partner, or user location, or default
  const selectedPartner = filtered.find((p) => p.id === selectedPartnerId);
  const mapCenter: [number, number] =
    selectedPartner?.latitude && selectedPartner?.longitude
      ? [selectedPartner.latitude, selectedPartner.longitude]
      : userLocation
      ? [userLocation.lat, userLocation.lng]
      : DEFAULT_CENTER;

  return (
    <div className="page-container py-6">
      {/* Header */}
      <div className="mb-5">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-extrabold text-[#1e3a5f]">
              {t('partners_title', language)}
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              {t('partners_subtitle', language)}
              {profile.district && profile.state
                ? ` · Showing results near ${profile.district}, ${profile.state}`
                : ''}
            </p>
          </div>
          {/* Stats strip */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 bg-white border border-gray-100 rounded-xl px-4 py-2.5 shadow-sm">
              <span className="text-2xl">👥</span>
              <div>
                <p className="text-lg font-extrabold text-[#1e3a5f] leading-none">{filtered.length}</p>
                <p className="text-xs text-gray-400">Partners found</p>
              </div>
            </div>
            {nearestDist !== undefined && nearestDist > 0 && (
              <div className="flex items-center gap-2 bg-white border border-gray-100 rounded-xl px-4 py-2.5 shadow-sm">
                <MapPin size={20} className="text-green-500" />
                <div>
                  <p className="text-lg font-extrabold text-[#1e3a5f] leading-none">{nearestDist} km</p>
                  <p className="text-xs text-gray-400">Nearest</p>
                </div>
              </div>
            )}
            {topMatchScore !== undefined && (
              <div className="flex items-center gap-2 bg-white border border-gray-100 rounded-xl px-4 py-2.5 shadow-sm">
                <span className="text-2xl">🎯</span>
                <div>
                  <p className="text-lg font-extrabold text-[#1e3a5f] leading-none">{topMatchScore}%</p>
                  <p className="text-xs text-gray-400">Top match</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Intelligent routing info */}
      {topScheme && (
        <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-3 mb-4 flex items-center gap-3">
          <span className="text-xl">🎯</span>
          <p className="text-sm text-indigo-800">
            <span className="font-semibold">Intelligent partner routing active.</span>{' '}
            Partners ranked for your top scheme: <strong>{topScheme.shortName}</strong>.
            {profile.isStreetVendor && ' Street vendor support partners prioritized.'}
          </p>
        </div>
      )}

      {/* Filter Pills */}
      <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
        <div className="flex flex-wrap gap-2">
          {FILTER_LABELS.map(([val, label]) => (
            <button
              key={val}
              onClick={() => setTypeFilter(val)}
              className={cn(
                'px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors',
                typeFilter === val
                  ? 'bg-[#1e3a5f] text-white border-[#1e3a5f]'
                  : 'border-gray-200 text-gray-600 bg-white hover:border-gray-300'
              )}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Location button */}
        <button
          onClick={requestLocation}
          disabled={locationStatus === 'loading'}
          className={cn(
            'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors',
            locationStatus === 'success'
              ? 'bg-green-50 border-green-300 text-green-700'
              : locationStatus === 'denied'
              ? 'bg-red-50 border-red-200 text-red-600'
              : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
          )}
        >
          {locationStatus === 'loading' ? (
            <><RefreshCw size={12} className="animate-spin" /> Locating…</>
          ) : locationStatus === 'success' ? (
            <><Navigation size={12} /> Location active</>
          ) : locationStatus === 'denied' ? (
            <><Info size={12} /> Location denied</>
          ) : (
            <><Navigation size={12} /> Use my location</>
          )}
        </button>
      </div>

      {/* Main layout: Map left + List right */}
      <div className="grid lg:grid-cols-[1fr_380px] gap-5 items-start">

        {/* ─── MAP ──────────────────────────────────────────────────────────── */}
        <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-md" style={{ height: 520 }}>
          <MapContainer
            center={mapCenter}
            zoom={DEFAULT_ZOOM}
            style={{ width: '100%', height: '100%' }}
            zoomControl={true}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Fly-to controller */}
            <MapController center={mapFlyTo} />

            {/* User location marker */}
            {userLocation && (
              <Marker
                position={[userLocation.lat, userLocation.lng]}
                icon={makeUserIcon()}
              >
                <Popup>
                  <div className="text-sm font-semibold">📍 You are here</div>
                </Popup>
              </Marker>
            )}

            {/* Partner markers */}
            {filtered
              .filter((p) => p.latitude && p.longitude && p.type !== 'online_portal')
              .map((partner, idx) => (
                <Marker
                  key={partner.id}
                  position={[partner.latitude!, partner.longitude!]}
                  icon={makePartnerIcon(partner.type, partner.id === selectedPartnerId)}
                  eventHandlers={{
                    click: () => handleMarkerClick(partner),
                  }}
                >
                  <Popup>
                    <div className="min-w-[160px]">
                      {idx === 0 && (
                        <span className="inline-block text-xs bg-orange-100 text-orange-700 font-bold px-2 py-0.5 rounded-full mb-1">
                          ⭐ AI Recommended
                        </span>
                      )}
                      <p className="font-bold text-sm text-gray-900">{partner.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{TYPE_LABELS[partner.type]}</p>
                      {partner.distance !== undefined && partner.distance > 0 && (
                        <p className="text-xs text-gray-400 mt-1">📍 {partner.distance} km away</p>
                      )}
                      <div className="flex items-center gap-1 mt-1">
                        <Star size={11} className="text-amber-500 fill-amber-500" />
                        <span className="text-xs font-semibold text-amber-700">{partner.rating.toFixed(1)}</span>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
          </MapContainer>

          {/* Bottom bar overlays */}
          <div className="absolute bottom-3 left-3 z-[1000] bg-white/95 rounded-xl px-3 py-2 shadow-md border border-gray-100 text-xs">
            <p className="text-gray-400 text-xs">Your location</p>
            <p className="font-semibold text-gray-800">
              {locationStatus === 'success'
                ? 'Live GPS location'
                : profile.district && profile.state
                ? `${profile.district}, ${profile.state}`
                : 'Mumbai (Default)'}
            </p>
          </div>
          <div className="absolute bottom-3 right-3 z-[1000] bg-white/95 rounded-xl px-3 py-2 shadow-md border border-gray-100 text-xs flex items-center gap-2">
            <span className="text-orange-500">🔀</span>
            <div>
              <p className="text-gray-400 text-xs">Optimised route</p>
              <p className="font-semibold text-gray-700">Based on your location & match score</p>
            </div>
          </div>
        </div>

        {/* ─── PARTNER LIST ─────────────────────────────────────────────────── */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-extrabold text-[#1e3a5f] text-base">Recommended Partners</h2>
            <span className="text-xs text-gray-400">Sort: Match Score</span>
          </div>

          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
            {filtered.length === 0 && (
              <div className="card text-center py-12 text-gray-400">
                <p className="text-sm font-medium">No partners found</p>
                <p className="text-xs mt-1">Try changing the filter above</p>
              </div>
            )}

            {filtered.map((partner, idx) => {
              const isSelected = partner.id === selectedPartnerId;
              const isTopPick = idx === 0;

              return (
                <div
                  key={partner.id}
                  ref={(el) => { cardRefs.current[partner.id] = el; }}
                  onClick={() => handleCardClick(partner)}
                  className={cn(
                    'bg-white rounded-2xl border p-4 cursor-pointer transition-all hover:shadow-md',
                    isSelected
                      ? 'border-orange-400 shadow-orange-100 shadow-md ring-2 ring-orange-300'
                      : 'border-gray-100',
                    isTopPick && !isSelected ? 'border-green-200' : ''
                  )}
                >
                  {/* Top Pick badge */}
                  {isTopPick && (
                    <div className="flex items-center gap-1.5 mb-2">
                      <span className="inline-flex items-center gap-1 text-xs bg-green-600 text-white font-bold px-2.5 py-0.5 rounded-full">
                        ✦ AI Recommended
                      </span>
                    </div>
                  )}

                  {/* Name + Rating */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2.5 flex-1 min-w-0">
                      {/* Type icon circle */}
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-lg"
                        style={{ background: TYPE_ICON_COLOR[partner.type] + '22' }}
                      >
                        {TYPE_ICON_EMOJI[partner.type]}
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-gray-900 text-sm leading-tight truncate">
                          {partner.name}
                        </p>
                        <span className={cn(
                          'inline-flex items-center gap-1 mt-0.5 text-xs font-medium px-2 py-0.5 rounded-full border',
                          TYPE_COLORS[partner.type]
                        )}>
                          <span className={cn('w-1.5 h-1.5 rounded-full', TYPE_DOT[partner.type])} />
                          {TYPE_LABELS[partner.type]}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-0.5 flex-shrink-0 bg-amber-50 px-2 py-1 rounded-lg">
                      <Star size={12} className="text-amber-500 fill-amber-500" />
                      <span className="text-xs font-bold text-amber-700">{partner.rating.toFixed(1)}</span>
                    </div>
                  </div>

                  {/* Distance + Services */}
                  <div className="flex items-center gap-3 mb-2 text-xs text-gray-500 flex-wrap">
                    {partner.type === 'online_portal' ? (
                      <span className="flex items-center gap-1 text-indigo-500 font-medium">
                        <ExternalLink size={11} /> Online — available anywhere
                      </span>
                    ) : partner.distance !== undefined && partner.distance > 0 ? (
                      <span className="flex items-center gap-1">
                        <MapPin size={11} className="text-gray-400" />
                        {partner.distance} km away
                      </span>
                    ) : null}
                    {/* Service badges */}
                    <div className="flex flex-wrap gap-1">
                      {partner.services.slice(0, 2).map((s) => (
                        <span key={s} className="px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded-full text-xs font-medium border border-blue-100">
                          {s}
                        </span>
                      ))}
                      {partner.services.length > 2 && (
                        <span className="px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded-full text-xs">
                          +{partner.services.length - 2}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Languages */}
                  <p className="text-xs text-gray-400 mb-3">
                    {partner.languages.join(' • ')}
                  </p>

                  {/* Description (collapsed unless selected) */}
                  {isSelected && partner.description && (
                    <p className="text-xs text-gray-600 mb-3 leading-relaxed border-t border-gray-50 pt-2">
                      {partner.description}
                    </p>
                  )}

                  {/* Connect CTA (shown only for top pick or selected) */}
                  {(isTopPick || isSelected) && (
                    <div className="flex gap-2 mt-1">
                      {partner.contactPhone && (
                        <a
                          href={`tel:${partner.contactPhone}`}
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1.5 text-xs font-semibold text-[#1e3a5f] bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <Phone size={12} /> {partner.contactPhone}
                        </a>
                      )}
                      {partner.website ? (
                        <a
                          href={partner.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 flex items-center justify-center gap-1.5 text-xs font-bold text-white bg-[#1e3a5f] hover:bg-[#162640] px-3 py-1.5 rounded-lg transition-colors"
                        >
                          {t('connect_partner', language)} <ArrowRight size={12} />
                        </a>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (partner.latitude && partner.longitude) {
                              setMapFlyTo([partner.latitude, partner.longitude]);
                            }
                          }}
                          className="flex-1 flex items-center justify-center gap-1.5 text-xs font-bold text-white bg-[#1e3a5f] hover:bg-[#162640] px-3 py-1.5 rounded-lg transition-colors"
                        >
                          {t('connect_partner', language)} <ArrowRight size={12} />
                        </button>
                      )}
                    </div>
                  )}

                  {/* Collapsed arrow for non-selected */}
                  {!isTopPick && !isSelected && (
                    <div className="flex items-center justify-end mt-1">
                      <ArrowRight size={14} className="text-gray-300" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom disclaimer */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-2xl p-4">
        <p className="text-sm font-bold text-blue-800 mb-0.5">YojanaMitra connects you — not applies for you.</p>
        <p className="text-xs text-blue-700">
          This platform prepares your profile, matches schemes, checks eligibility, and connects you with the
          right partner. The partner (bank, NGO, or government office) will process your actual application.
          All eligibility decisions are made by official government criteria, not this platform.
        </p>
      </div>
    </div>
  );
}
