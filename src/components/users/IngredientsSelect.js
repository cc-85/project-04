import React from 'react';
import Select from 'react-select';

const IngredientsSelect = ({ ingredients, defaultValue, onChange, ...props }) => {

  const options = ingredients.map(ingredient => ({
    value: ingredient.name,
    label: ingredient.name
  }));

  defaultValue = defaultValue.map(ingredient => ({
    value: ingredient.name,
    label: ingredient.name
  }));

  const handleChange = (selected) => {
    const ingredients = selected.map(ingredient => ({ name: ingredient.value }));
    onChange({ target: { name: 'ingredients', value: ingredients }});
  };

  return (
    <Select
      {...props}
      options={options}
      defaultValue={defaultValue}
      onChange={handleChange}
    />
  );
};

export default IngredientsSelect;
