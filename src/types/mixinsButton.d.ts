export interface ButtonBasic {
  padding: 'tiny' | 'small' | 'medium';
}

export interface ButtonBg {
  color: 'main' | 'danger';
  disabled: boolean;
  loading: boolean;
  padding: 'tiny' | 'small' | 'medium';
}

export interface ButtonBorder {
  color: 'main' | 'danger';
  disabled: boolean;
  loading: boolean;
  padding: 'tiny' | 'small' | 'medium';
}

export interface ButtonCustom {
  padding: 'tiny' | 'small' | 'medium';
  theme: 'withBg' | 'noBg' | 'border';
  color: 'main' | 'danger';
  loading: boolean;
  disabled: boolean;
}
