import { useState } from "react";
import styles from "./TagFilterGroup.module.scss";
import type { TagFilterGroupTypes } from "./model/types";

export const TagFilterGroup = ({
  title,
  items,
  selectedId,
  onSelect,
}: TagFilterGroupTypes) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const visibleItems = isExpanded ? items : items.slice(0, 5);

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{title}</h3>

      <div className={styles.tags}>
        {visibleItems.map((item) => {
          const isItemActive = () => {
            if (item.values && Array.isArray(selectedId)) {
              return item.values.every((v) =>
								selectedId.some((id) => String(id) === String(v)),
							);
            }
            if (Array.isArray(selectedId)) {
              return selectedId.some((id) => String(id) === String(item.id));
            }
            return item.id === selectedId;
          };

          const isActive = isItemActive();

          return (
            <button
              key={item.id}
              type="button"
              className={`${styles.tag} ${isActive ? styles.active : ""}`}
              onClick={() => onSelect(item.id)}
            >
              {item.icon && (
                <img 
                  src={item.icon} 
                  alt="" 
                  className={styles.icon} 
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              )}
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {items.length > 5 && (
        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          className={styles.button}
        >
          {isExpanded ? "Скрыть" : "Посмотреть все"}
        </button>
      )}
    </div>
  );
};
