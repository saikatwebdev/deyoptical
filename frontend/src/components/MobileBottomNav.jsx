import React, { memo } from 'react';

function MobileBottomNavComponent({ currentPage, navigate }) {
  const items = [
    {
      id: 'booking',
      label: 'Booking',
      sublabel: 'Appointment',
      icon: 'calendar_month',
    },
    {
      id: 'gallery',
      label: 'Gallery',
      sublabel: 'Visuals',
      icon: 'photo_library',
    },
    {
      id: 'lenses',
      label: 'Lens Info',
      sublabel: 'Eyewear',
      icon: 'visibility',
    },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-xl border-t border-outline-variant/30 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] pb-[env(safe-area-inset-bottom)]"
    >
      <div className="grid grid-cols-3 h-16 max-w-md mx-auto px-2">
        {items.map((item) => {
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.id)}
              className={`relative flex flex-col items-center justify-center gap-1 transition-all duration-200 active:scale-95 cursor-pointer select-none py-1.5 ${
                isActive
                  ? 'text-primary font-bold'
                  : 'text-secondary hover:text-on-surface'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              {/* Active pill indicator backdrop */}
              <div
                className={`flex items-center justify-center w-12 h-7 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'bg-primary/15 text-primary shadow-xs'
                    : 'bg-transparent text-secondary'
                }`}
              >
                <span
                  className="material-symbols-outlined text-[22px] transition-transform duration-200"
                  style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {item.icon}
                </span>
              </div>

              {/* Text label */}
              <span
                className={`text-[11px] leading-none tracking-tight transition-colors duration-200 ${
                  isActive ? 'font-bold text-primary' : 'font-medium text-secondary'
                }`}
              >
                {item.label}
              </span>

              {/* Active dot */}
              {isActive && (
                <span className="absolute top-1.5 w-1 h-1 rounded-full bg-primary" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default memo(MobileBottomNavComponent);
