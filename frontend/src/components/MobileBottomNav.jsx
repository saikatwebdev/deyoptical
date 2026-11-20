import React, { memo } from 'react';

function MobileBottomNavComponent({ currentPage, navigate }) {
  const items = [
    {
      id: 'booking',
      label: 'Booking',
      icon: 'calendar_month',
    },
    {
      id: 'gallery',
      label: 'Gallery',
      icon: 'photo_library',
    },
    {
      id: 'home',
      label: 'Home',
      icon: 'home',
    },
    {
      id: 'lenses',
      label: 'Lens Info',
      icon: 'visibility',
    },
  ];

  const handleItemClick = (id) => {
    navigate(id);
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#DC143C] border-t border-white/20 shadow-[0_-4px_24px_rgba(220,20,60,0.3)] pb-[env(safe-area-inset-bottom)] select-none outline-none focus:outline-none"
      style={{ WebkitTapHighlightColor: 'transparent', outline: 'none' }}
    >
      <div className="grid grid-cols-4 h-16 max-w-md mx-auto px-1 items-center outline-none">
        {items.map((item) => {
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className="relative flex flex-col items-center justify-center gap-1 transition-all duration-200 active:scale-95 cursor-pointer select-none py-1.5 outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 ring-0 border-0 border-none shadow-none"
              style={{
                WebkitTapHighlightColor: 'transparent',
                outline: 'none',
                border: 'none',
                WebkitUserSelect: 'none',
              }}
              aria-current={isActive ? 'page' : undefined}
            >
              {/* Active / Inactive Pill backdrop */}
              <div
                className={`flex items-center justify-center w-12 h-7 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'bg-white/20 border border-white/30 shadow-xs scale-105'
                    : 'bg-transparent hover:bg-white/10 border border-transparent'
                }`}
                style={{ outline: 'none' }}
              >
                <span
                  className="material-symbols-outlined text-[22px] text-white transition-transform duration-200"
                  style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {item.icon}
                </span>
              </div>

              {/* Text label - Always crisp white */}
              <span
                className={`text-[11px] leading-none tracking-tight transition-all duration-200 ${
                  isActive
                    ? 'font-bold text-white drop-shadow-xs'
                    : 'font-medium text-white/85'
                }`}
              >
                {item.label}
              </span>

              {/* Active top indicator dot */}
              {isActive && (
                <span className="absolute top-1 w-1.5 h-1.5 rounded-full bg-white shadow-xs" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default memo(MobileBottomNavComponent);
