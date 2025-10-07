"use client";

import React from "react";

import { AnimatedTimePredictionCard, TimePredictionCard } from "@/shared/ui";

// Пример использования статичного компонента
export function StaticTimePredictionExample() {
  const handleViewOrder = () => {
    // Обработка нажатия на кнопку
    alert("Переход к замовленню");
  };

  return (
    <TimePredictionCard
      hours={0}
      minutes={57}
      seconds={11}
      onViewOrder={handleViewOrder}
      className="max-w-sm"
    />
  );
}

// Пример использования анимированного компонента
export function AnimatedTimePredictionExample() {
  const handleViewOrder = () => {
    // Обработка нажатия на кнопку
    alert("Переход к замовленню");
  };

  return (
    <AnimatedTimePredictionCard
      initialHours={0}
      initialMinutes={5}
      initialSeconds={0}
      onViewOrder={handleViewOrder}
      className="max-w-sm"
      autoCountdown={true}
    />
  );
}

// Пример с кастомными стилями
export function CustomStyledTimePredictionExample() {
  const handleViewOrder = () => {
    // Обработка нажатия на кнопку
    alert("Переход к замовленню");
  };

  return (
    <div className="space-y-4">
      {/* Статичный с кастомными цветами */}
      <TimePredictionCard
        hours={1}
        minutes={23}
        seconds={45}
        onViewOrder={handleViewOrder}
        className="max-w-sm border-2 border-blue-200"
      />

      {/* Анимированный с кастомными цветами */}
      <AnimatedTimePredictionCard
        initialHours={0}
        initialMinutes={2}
        initialSeconds={30}
        onViewOrder={handleViewOrder}
        className="max-w-sm border-2 border-green-200"
        autoCountdown={true}
      />
    </div>
  );
}
