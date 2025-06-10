import './styles/styles.css';
import deleteIcon from '../../images/trash-bin.png';


export default function Modal({ onClose, onConfirm, children }) {
    return(
        <div className='popup-overlay' onClick={onClose}>
            <div className='popup-content' onClick={e => e.stopPropagation()}>
                {children}
                <div className="popup-buttons">
                    <button className="popup-close" onClick={onClose}>×</button>
                    <button className='cancel-btn' onClick={onClose}>Отменить</button>
                    <button className='delete-btn' onClick={onConfirm}>
                        <img src={deleteIcon} alt='delete' />
                        Удалить
                    </button>
                    
                </div>
            </div>
        </div>
    )
}