export interface IElements {
  id: number;
  properties?: IElementProperties;
  value: string;
  coords: IElementCoords
}

export interface IElementProperties {
  shape?: 'square' | 'circle';
  color?: string;
  role?: string;
}

export interface IElementCoords{
  x: number;
  y: number;
}
