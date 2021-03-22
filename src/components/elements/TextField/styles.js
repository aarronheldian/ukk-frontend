const styles = theme => {

  const { color: { general = {}, primary = {} } = {} } = theme || {};

  return {
    helperError: {
      color: `${primary.main} !important`,
      fontSize: 10,
    },
    inputDisabled: {
      color: general.light
    },
    inputRoot: {
      color: general.main,
      fontSize: 14,
      lineHeight: '1.5'
    },
    labelDisabled: {
      color: `${general.light} !important`
    },
    labelFocused: {
      color: `${general.main} !important`
    },
    labelRoot: {
      color: general.mid,
      fontSize: 14
    },
    labelShrink: {
      fontWeight: 500,
      transform: 'translate(0, 6px) scale(0.8)'
    },
    labelxError: {
      color: `${primary.main} !important`
    },
  };
};

export default styles;
