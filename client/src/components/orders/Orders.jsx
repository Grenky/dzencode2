import { motion } from 'framer-motion';
import { useState } from 'react';
import Products from '../products/Products';
import { orders, products } from '../../data.js';
import Modal from '../modal/Modal.jsx';
import './styles/styles.css';
import TrashIcon from '../../images/trash-can.png';

console.log('orders:', orders);
console.log('products:', products);



export default function Orders() {
    const [selectedType, setSelectedType] = useState('');
    const [selectedSpecification, setSelectedSpecification] = useState('');
    const [activeOrderId, setActiveOrderId] = useState(null);
    const [showDeletedPopup, setShowDeletedPopup] = useState(false);
    const [orderedToDelete, setOrderedToDelete] = useState(null);

    const types = [...new Set(products.map(p => p.type))];
    const specifications = [...new Set(products.map(p => p.specification))];

    const handleDelete = (order) => {
        setOrderedToDelete(order);
        setShowDeletedPopup(true);
    };

    const confirmDelete = () => {
        console.log('Deleted order', orderedToDelete);
        setShowDeletedPopup(false);
        setOrderedToDelete(null);
    }



    return(
        <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.3 }}
    >

        



            <div className="orders-wrapper">
                <div className="orders_selection-box">
                    <h1>Продукти / 25</h1>
                    <div className="orders_selection-type">
                        <p>Тип:</p>
                        <select className="type" value={selectedType} onChange={e => setSelectedType(e.target.value)}>
                            <option value="">Moni l</option>
                            {types.map(type => <option key={type} value={type}>{type}</option>)}
                        </select>
                    </div>
                    <div  className="orders_selection-specification">
                        <p>Спецификация:</p>
                        <select className="specification" value={selectedSpecification} onChange={e => setSelectedSpecification(e.target.value)}>
                            <option value="">Moni l</option>
                            {specifications.map(spec => <option key={spec} value={spec}>{spec}</option>)}
                        </select>
                    </div>
                </div>

                {orders.map(order => {
                    const filteredProduct = products.filter(p => 
                        p.order === order.id &&
                        (selectedType === '' || p.type === selectedType) &&
                        (selectedSpecification === '' || p.specification === selectedSpecification) 
                    );
                     
                    return (
                        <div key={order.id} className="order-block">
                            <h2 onClick={() => setActiveOrderId(order.id === activeOrderId ? null : order.id)}>{order.title}</h2>

                            {activeOrderId === order.id && (
                                <div className="order-details">
                                    <button className="order-details__close" onClick={() => setActiveOrderId(null)}>×</button>
                                    <Products products={filteredProduct} />
                                    <p>Количество продуктов: {filteredProduct.length}
                                    Дата создания: {new Date(order.date).toLocaleDateString()} <br />
                                    Полная дата: {order.date}
                                    </p>
                                    <p>
                                       Сума:
                                       {['UAH',  'USD'].map(symbol => {
                                        const total = filteredProduct.reduce((acc, p) => {
                                            const price = p.price.find(pr => pr.symbol === symbol);
                                            return acc + (price ? price.value : 0);
                                        }, 0);
                                        return <span key={symbol}> {total} {symbol} </span>                                        
                                       })}
                                    </p>

                                    <img alt='trash-btn' className="delete-btn" onClick={() => handleDelete(order)} src={TrashIcon}></img>

                                    
                                </div>
                            )}
                        </div>
                    );
                    
                })}
                

                {showDeletedPopup && (
                    <Modal 
                        onClose={() => setShowDeletedPopup(false)}
                        onConfirm={confirmDelete}
                    >
                        <p>Вы уверены что хотите удалить этот приход?</p>
                        <strong>{orderedToDelete?.title}</strong>
                    </Modal>
                )}
            </div>
        </motion.div>
    )
}