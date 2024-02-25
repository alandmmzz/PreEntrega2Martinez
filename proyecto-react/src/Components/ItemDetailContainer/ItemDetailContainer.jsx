import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductsJson from '../../JSON/Products.json'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import "./ItemDetailContainer.css"
import ItemCount from '../ItemCount/ItemCount';

function asyncMock(itemId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(itemId === undefined) {
                console.log("ID Undefined")
             } else {
            const productFiltered = ProductsJson.filter((item) => {
                return item.id == itemId
            })
            resolve(productFiltered)
        }
        }, 2000);
    })
}

export default function ItemDetailContainer() {
    
    const { itemId } = useParams()
    const [item, setItem] = useState([]);
    
    useEffect(() => {
        asyncMock(itemId).then((res) => setItem(res));
    }, [itemId]);

    function purchaseProducts() {
        console.log("productos enviados")
    }

    return (
        <div className="CardContainer d-flex justify-content-center w-100">
            <Card style={{ width: '18rem', marginRight: '15px' }}>
                <Card.Img variant="top" src={item[0]?.image} />
                <Card.Body>
                    <Card.Title>{item[0]?.title}</Card.Title>
                    <Card.Text>
                    {item[0]?.description}
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item className="d-flex justify-content-center fw-bold">{item[0]?.price}</ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-center fw-bold">{item[0]?.category}</ListGroup.Item>
                </ListGroup>
            </Card>
            <Card style={{ width: '27rem' }}>
            <ItemCount initial="5" stock="10" onAdd={() => purchaseProducts()}/>
            </Card>
        </div>
    )
}