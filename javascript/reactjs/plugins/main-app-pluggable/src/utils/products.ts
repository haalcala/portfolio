import {ProductComponent} from '../types/store/plugins';

export const getCurrentProductId = (products: ProductComponent[], pathname: string): string | null => {
    if (!products) {
        return null;
    }

    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        if (pathname.startsWith(product.baseURL)) {
            return product.id;
        }
    }

    return null;
};
