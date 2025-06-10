import { motion } from 'framer-motion';


export default function Products({ products }) {
    if(!Array.isArray(products) || products.length === 0) {
        return <p>No products to display</p>;
    }
    return(
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.3 }}
        >
        <div className="products-wrapper">
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        <strong>{product.title}</strong> - {product.type},  {product.specification}
                    </li>
                ))}
            </ul>
        </div>
        </motion.div>
    );
}