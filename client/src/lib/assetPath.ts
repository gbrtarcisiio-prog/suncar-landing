const ASSET_BASE = (
  import.meta.env.VITE_ASSET_BASE ||
  (import.meta.env.DEV ? "/manus-storage" : "/media")
).replace(/\/+$/, "");

export function assetPath(filename: string) {
  if (import.meta.env.DEV && ASSET_BASE === "/manus-storage") {
    const previewAssets: Record<string, string> = {
      "logo.png": "logo_1864b974.png",
      "hero-editorial-opt.jpg": "hero-editorial-opt_5c139c0f.jpg",
      "showroom-editorial-opt.jpg": "showroom-editorial-opt_6c295266.jpg",
      "car-red-dealership-opt.jpg": "car-red-dealership-opt_391d1b0a.jpg",
      "car-showroom-side-opt.jpg": "car-showroom-side-opt_454220e3.jpg",
      "car-suv-opt.jpg": "car-suv-opt_22e9c130.jpg",
      "car-blue-sedan-opt.jpg": "car-blue-sedan-opt_f98968da.jpg",
      "car-lineup-opt.jpg": "car-lineup-opt_134f2e7c.jpg",
      "car-sedan-opt.jpg": "car-sedan-opt_06df71b6.jpg",
    };
    return `${ASSET_BASE}/${previewAssets[filename] || filename}`;
  }
  return `${ASSET_BASE}/${filename}`;
}
