import { CSSObjectWithLabel, ControlProps } from 'react-select';
const selectStyles = {
  control: (baseStyles: CSSObjectWithLabel, state: ControlProps) => {
    let borderColor: string = '#3A35413B';
    if (state.isFocused) borderColor = '#3A35413B';

    if (state.isFocused && state.isDisabled) borderColor = '#3A35413B';
    return {
      ...baseStyles,
      '&:hover': {
        borderColor: '#3A35413B',
      },
      '&:focus': {
        borderColor: '#3A35413B',
      },
      borderColor,
      boxShadow: 'none',
      borderWidth: '1px',
      borderRadius: '6px',
      fontSize: '16px',
      padding: '0 0 0 1rem',
      height: '56px',
    };
  },
  valueContainer: (baseStyles: CSSObjectWithLabel) => ({
    ...baseStyles,
    padding: '0',
  }),
  placeholder: (baseStyles: CSSObjectWithLabel) => ({
    ...baseStyles,
    margin: '0',
    padding: '0',
    color: '#BDBDBD',
  }),
  input: (baseStyles: CSSObjectWithLabel) => ({
    ...baseStyles,
    margin: '0',
    padding: '0',
    fontSize: '0.875rem',
    fontWeight: '500',
  }),
  indicatorsContainer: (baseStyles: CSSObjectWithLabel) => ({
    ...baseStyles,
    margin: '0',
    padding: '0',
  }),
};

export default selectStyles;
