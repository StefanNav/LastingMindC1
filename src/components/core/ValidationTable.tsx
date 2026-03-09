"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Pencil, Check, Plus, X } from "lucide-react";
import { transitions, animations } from "@/lib/animations";
import type { ValidationColumn, ValidationRow } from "@/types";

interface ValidationTableProps {
  data: ValidationRow[];
  columns: ValidationColumn[];
  onConfirm: (data: ValidationRow[]) => void;
  onAddMore?: () => void;
  confirmLabel?: string;
  addMoreLabel?: string;
}

export default function ValidationTable({
  data: initialData,
  columns,
  onConfirm,
  onAddMore,
  confirmLabel = "Looks good!",
  addMoreLabel = "Add someone I missed",
}: ValidationTableProps) {
  const [rows, setRows] = useState<ValidationRow[]>(initialData);
  const [editingRow, setEditingRow] = useState<number | null>(null);
  const [editValues, setEditValues] = useState<ValidationRow>({});
  const [isAdding, setIsAdding] = useState(false);
  const [newRow, setNewRow] = useState<ValidationRow>({});

  const startEdit = useCallback(
    (index: number) => {
      setEditingRow(index);
      setEditValues({ ...rows[index] });
    },
    [rows]
  );

  const saveEdit = useCallback(() => {
    if (editingRow === null) return;
    setRows((prev) => {
      const updated = [...prev];
      updated[editingRow] = { ...editValues };
      return updated;
    });
    setEditingRow(null);
    setEditValues({});
  }, [editingRow, editValues]);

  const cancelEdit = useCallback(() => {
    setEditingRow(null);
    setEditValues({});
  }, []);

  const startAdd = useCallback(() => {
    setIsAdding(true);
    const empty: ValidationRow = {};
    columns.forEach((col) => {
      empty[col.key] = "";
    });
    setNewRow(empty);
  }, [columns]);

  const saveAdd = useCallback(() => {
    const hasValue = Object.values(newRow).some((v) => v.trim());
    if (!hasValue) {
      setIsAdding(false);
      return;
    }
    setRows((prev) => [...prev, { ...newRow }]);
    setNewRow({});
    setIsAdding(false);
  }, [newRow]);

  const removeRow = useCallback((index: number) => {
    setRows((prev) => prev.filter((_, i) => i !== index));
  }, []);

  return (
    <motion.div
      className="w-full max-w-md mx-auto"
      {...animations.fadeInUp}
      transition={transitions.gentle}
    >
      <h3 className="font-display text-xl text-bark mb-1 text-center">
        Here&apos;s your family so far
      </h3>
      <p className="text-sm text-bark-muted mb-5 text-center">
        Tap the pencil to make corrections
      </p>

      {/* Table */}
      <div className="bg-warm-white rounded-xl border border-bark-muted/10 overflow-hidden shadow-sm">
        {/* Header row */}
        <div className="flex items-center px-4 py-2.5 bg-sage-light/20 border-b border-bark-muted/10">
          {columns.map((col) => (
            <div
              key={col.key}
              className="flex-1 text-xs font-semibold text-bark-muted uppercase tracking-wider"
            >
              {col.label}
            </div>
          ))}
          <div className="w-16" /> {/* Space for actions */}
        </div>

        {/* Data rows */}
        {rows.map((row, index) => (
          <motion.div
            key={index}
            className="flex items-center px-4 py-3 border-b border-bark-muted/5 last:border-b-0"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05, ...transitions.gentle }}
          >
            {editingRow === index ? (
              /* Editing state */
              <>
                {columns.map((col) => (
                  <div key={col.key} className="flex-1 pr-2">
                    <input
                      value={editValues[col.key] || ""}
                      onChange={(e) =>
                        setEditValues((prev) => ({
                          ...prev,
                          [col.key]: e.target.value,
                        }))
                      }
                      className="w-full px-2 py-1 rounded-lg bg-sage-light/30 border border-sage/30 text-sm text-bark focus:outline-none focus:ring-1 focus:ring-sage"
                    />
                  </div>
                ))}
                <div className="flex items-center gap-1 w-16 justify-end">
                  <button
                    onClick={saveEdit}
                    className="w-7 h-7 rounded-full bg-sage-dark flex items-center justify-center"
                  >
                    <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="w-7 h-7 rounded-full bg-bark-muted/10 flex items-center justify-center"
                  >
                    <X className="w-3.5 h-3.5 text-bark-muted" />
                  </button>
                </div>
              </>
            ) : (
              /* Display state */
              <>
                {columns.map((col) => (
                  <div key={col.key} className="flex-1">
                    <span className="text-sm text-bark">
                      {row[col.key] || "—"}
                    </span>
                  </div>
                ))}
                <div className="flex items-center gap-1 w-16 justify-end">
                  <button
                    onClick={() => startEdit(index)}
                    className="w-7 h-7 rounded-full hover:bg-sage-light/40 flex items-center justify-center transition-colors"
                  >
                    <Pencil className="w-3.5 h-3.5 text-bark-muted" />
                  </button>
                  <button
                    onClick={() => removeRow(index)}
                    className="w-7 h-7 rounded-full hover:bg-rose-light/40 flex items-center justify-center transition-colors"
                  >
                    <X className="w-3.5 h-3.5 text-bark-muted/50" />
                  </button>
                </div>
              </>
            )}
          </motion.div>
        ))}

        {/* Add new row */}
        {isAdding && (
          <motion.div
            className="flex items-center px-4 py-3 bg-sage-light/10 border-t border-bark-muted/10"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
          >
            {columns.map((col) => (
              <div key={col.key} className="flex-1 pr-2">
                <input
                  value={newRow[col.key] || ""}
                  onChange={(e) =>
                    setNewRow((prev) => ({
                      ...prev,
                      [col.key]: e.target.value,
                    }))
                  }
                  placeholder={col.label}
                  className="w-full px-2 py-1 rounded-lg bg-white border border-sage/30 text-sm text-bark focus:outline-none focus:ring-1 focus:ring-sage placeholder:text-bark-muted/40"
                />
              </div>
            ))}
            <div className="flex items-center gap-1 w-16 justify-end">
              <button
                onClick={saveAdd}
                className="w-7 h-7 rounded-full bg-sage-dark flex items-center justify-center"
              >
                <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
              </button>
              <button
                onClick={() => setIsAdding(false)}
                className="w-7 h-7 rounded-full bg-bark-muted/10 flex items-center justify-center"
              >
                <X className="w-3.5 h-3.5 text-bark-muted" />
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col items-center gap-3 mt-6">
        <motion.button
          onClick={() => onConfirm(rows)}
          className="w-full px-6 py-3.5 rounded-full bg-sage-dark text-white font-semibold shadow-md hover:shadow-lg active:scale-[0.98] transition-all"
          whileTap={{ scale: 0.98 }}
        >
          {confirmLabel}
        </motion.button>

        {!isAdding && (
          <button
            onClick={onAddMore || startAdd}
            className="flex items-center gap-1.5 text-sm font-medium text-sage-dark hover:text-sage transition-colors"
          >
            <Plus className="w-4 h-4" />
            {addMoreLabel}
          </button>
        )}

        <p className="text-xs text-bark-muted/60 text-center mt-2 max-w-xs">
          Don&apos;t worry — you can come back and add to this list anytime.
        </p>
      </div>
    </motion.div>
  );
}
