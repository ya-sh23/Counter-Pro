import React, { createContext, useContext, useState, useEffect } from 'react';

const CounterContext = createContext();

export function CounterProvider({ children }) {
  const [fields, setFields] = useState(() => {
    const saved = localStorage.getItem('counter_pro_fields');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return [
      {
        id: 'field-1',
        title: '',
        selectionType: 'single',
        buttons: [
          { id: 'b1', label: '', color: 'yellow', count: 0 },
          { id: 'b2', label: '', color: 'white', count: 0 },
          { id: 'b3', label: '', color: 'grey', count: 0 }
        ]
      }
    ];
  });

  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('counter_pro_history');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return [];
  });

  const [activeTab, setActiveTab] = useState('counters');
  const [draggedId, setDraggedId] = useState(null);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    localStorage.setItem('counter_pro_fields', JSON.stringify(fields));
  }, [fields]);

  useEffect(() => {
    localStorage.setItem('counter_pro_history', JSON.stringify(history));
  }, [history]);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  const recordHistory = (actionDesc) => {
    const newEntry = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleString(),
      description: actionDesc,
      snapshot: JSON.parse(JSON.stringify(fields))
    };
    setHistory(prev => [newEntry, ...prev].slice(0, 20));
  };

  const addField = () => {
    const newField = {
      id: 'field-' + Date.now(),
      title: '',
      selectionType: 'single',
      buttons: [
        { id: 'b-' + Date.now() + '-1', label: '', color: 'yellow', count: 0 },
        { id: 'b-' + Date.now() + '-2', label: '', color: 'white', count: 0 }
      ]
    };
    setFields(prev => [...prev, newField]);
    recordHistory('Created new counter group');
    showNotification('Counter group added');
  };

  const removeField = (fieldId) => {
    setFields(prev => prev.filter(f => f.id !== fieldId));
    recordHistory('Deleted a counter group');
    showNotification('Counter group removed');
  };

  const updateFieldTitle = (fieldId, title) => {
    setFields(prev => prev.map(f => f.id === fieldId ? { ...f, title } : f));
  };

  const toggleSelectionType = (fieldId) => {
    setFields(prev => prev.map(f => {
      if (f.id === fieldId) {
        const nextType = f.selectionType === 'single' ? 'multiple' : 'single';
        return { ...f, selectionType: nextType };
      }
      return f;
    }));
  };

  const addButton = (fieldId) => {
    const palette = ['yellow', 'white', 'grey', 'black'];
    const randomColor = palette[Math.floor(Math.random() * palette.length)];
    
    setFields(prev => prev.map(f => {
      if (f.id === fieldId) {
        const newBtn = {
          id: 'btn-' + Date.now(),
          label: '',
          color: randomColor,
          count: 0
        };
        return { ...f, buttons: [...f.buttons, newBtn] };
      }
      return f;
    }));
  };

  const removeButton = (fieldId, btnId) => {
    setFields(prev => prev.map(f => {
      if (f.id === fieldId) {
        return { ...f, buttons: f.buttons.filter(b => b.id !== btnId) };
      }
      return f;
    }));
    showNotification('Option removed');
  };

  const updateButtonLabel = (fieldId, btnId, label) => {
    setFields(prev => prev.map(f => {
      if (f.id === fieldId) {
        return {
          ...f,
          buttons: f.buttons.map(b => b.id === btnId ? { ...b, label } : b)
        };
      }
      return f;
    }));
  };

  const updateButtonColor = (fieldId, btnId, color) => {
    setFields(prev => prev.map(f => {
      if (f.id === fieldId) {
        return {
          ...f,
          buttons: f.buttons.map(b => b.id === btnId ? { ...b, color } : b)
        };
      }
      return f;
    }));
  };

  const handleIncrement = (fieldId, btnId) => {
    setFields(prev => prev.map(f => {
      if (f.id !== fieldId) return f;

      if (f.selectionType === 'single') {
        return {
          ...f,
          buttons: f.buttons.map(b => ({
            ...b,
            count: b.id === btnId ? b.count + 1 : 0
          }))
        };
      } else {
        return {
          ...f,
          buttons: f.buttons.map(b => ({
            ...b,
            count: b.id === btnId ? b.count + 1 : b.count
          }))
        };
      }
    }));
  };

  const resetFieldCounts = (fieldId) => {
    setFields(prev => prev.map(f => {
      if (f.id === fieldId) {
        return {
          ...f,
          buttons: f.buttons.map(b => ({ ...b, count: 0 }))
        };
      }
      return f;
    }));
    recordHistory('Reset counters in a group');
    showNotification('Counts reset for group');
  };

  const resetAllCounts = () => {
    setFields(prev => prev.map(f => ({
      ...f,
      buttons: f.buttons.map(b => ({ ...b, count: 0 }))
    })));
    recordHistory('Reset all counters globally');
    showNotification('All counts reset');
  };

  return (
    <CounterContext.Provider value={{
      fields, history, activeTab, setActiveTab, draggedId, setDraggedId,
      notification, showNotification, addField, removeField, updateFieldTitle,
      toggleSelectionType, addButton, removeButton, updateButtonLabel,
      updateButtonColor, handleIncrement, resetFieldCounts, resetAllCounts, setHistory
    }}>
      {children}
    </CounterContext.Provider>
  );
}

export function useCounter() {
  return useContext(CounterContext);
}
