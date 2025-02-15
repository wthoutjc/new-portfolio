export interface Module {
  name: string;
  id: string;
  url: string | null;
  is_active: boolean;
  items: ModuleItem[];
  icon?: RefAttributes<SVGSVGElement>;
}

export interface ModuleItem {
  name: string;
  id: string;
  url: string;
  module_id: string;
}

export interface ItemModule {
  id: string;
  name: string;
}
