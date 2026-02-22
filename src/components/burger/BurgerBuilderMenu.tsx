import { BURGER_INGREDIENTS, BurgerIngredientKey, TOTAL_INGREDIENTS_LIMIT } from '@/src/lib/core/constants/burgerBuilder';
import React, { useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import { Button } from '../ui/Button';

type BuilderState = Record<BurgerIngredientKey, number>;

const INITIAL_STATE: BuilderState = {
  breadTop: 0,
  breadBottom: 0,
  patty: 0,
  cheese: 0,
  lettuce: 0,
  tomato: 0,
  onion: 0,
  pickle: 0,
  bacon: 0,
  sauce: 0,
};

const getTotal = (state: BuilderState) =>
  Object.values(state).reduce((sum, count) => sum + count, 0);

export const BurgerBuilderMenu = () => {
  const [state, setState] = useState<BuilderState>(INITIAL_STATE);

  const total = useMemo(() => getTotal(state), [state]);

  const addIngredient = (key: BurgerIngredientKey, max: number) => {
    setState((prev) => {
      if (prev[key] >= max || getTotal(prev) >= TOTAL_INGREDIENTS_LIMIT) return prev;
      return { ...prev, [key]: prev[key] + 1 };
    });
  };

  const removeIngredient = (key: BurgerIngredientKey) => {
    setState((prev) => {
      if (prev[key] <= 0) return prev;
      return { ...prev, [key]: prev[key] - 1 };
    });
  };

  const resetBurger = () => setState(INITIAL_STATE);

  return (
    <View className="bg-dracula-selection p-4 rounded-xl border border-dracula-selection">
      <Text className="text-lg font-bold text-dracula-purple mb-2">🍔 Arma tu hamburguesa</Text>
      <Text className="text-sm text-dracula-comment mb-4">
        Límite total: {total}/{TOTAL_INGREDIENTS_LIMIT} ingredientes para evitar saturar la app.
      </Text>

      {BURGER_INGREDIENTS.map((ingredient) => {
        const count = state[ingredient.key];
        const atMax = count >= ingredient.max;
        return (
          <View
            key={ingredient.key}
            className="mb-3 p-3 rounded-lg border border-[#44475a] bg-dracula-bg"
          >
            <Text className="text-dracula-fg font-semibold">{ingredient.label}</Text>
            <Text className="text-xs text-dracula-comment mb-2">
              Capas: {count}/{ingredient.max} · Modelo: {ingredient.modelPath}
            </Text>
            <View className="flex-row gap-2">
              <View className="flex-1">
                <Button title="Quitar" variant="ghost" onPress={() => removeIngredient(ingredient.key)} disabled={count === 0} />
              </View>
              <View className="flex-1">
                <Button
                  title="Agregar"
                  onPress={() => addIngredient(ingredient.key, ingredient.max)}
                  disabled={atMax || total >= TOTAL_INGREDIENTS_LIMIT}
                />
              </View>
            </View>
          </View>
        );
      })}

      <Button title="Reiniciar hamburguesa" variant="secondary" onPress={resetBurger} />
    </View>
  );
};