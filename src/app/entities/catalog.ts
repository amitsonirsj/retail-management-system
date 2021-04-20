export interface CatalogResponse {
    data: CatalogData;
    error: any;
    status: string;
}

export interface CatalogData {
    locations: CatalogLocation[];
}

export interface CatalogLocation {
    branches: CatalogBranch[];
    dealers_id: string;
    name: string;
    opco: string;
}

export interface CatalogBranch {
    branch_id: string;
    name: string;
    categories: CatalogCategory[];
}

export interface CatalogCategory {
    image: string;
    name: string;
    subcategories?: CatalogCategory[];
}