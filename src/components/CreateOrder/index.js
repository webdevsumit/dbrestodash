import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./style.css";
import { createOrderAPI, filterProductsAPI, getQrCodesAPI } from '../../apis/common';
import toast from 'react-hot-toast';
import Select from 'react-select';
import { Card } from 'react-bootstrap';

function CreateOrder({ show, onHide, tableName, qr_id=0 }) {

    const [data, setData] = useState([]);
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedOption, setSelectedOption] = useState(null);
    const [totalInPaisa, setTotalInPaisa] = useState(0);
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [creatingOrder, setCreatingOrder] = useState(false);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [tables, setTables] = useState([]);
    const [selectedTable, setSelectedTable] = useState(tableName)

    const onSave = async (e) => {
        e.preventDefault();
        if (creatingOrder) {
            return;
        }
        const payload = {
            "products": data.map(prod => ({ "id": prod.id, "quantity": prod.quantity })),
            "name": name,
            "phone": phone,
            "tableName": selectedTable,
            "qr_id": qr_id
        }
        setCreatingOrder(true);
        await createOrderAPI(payload).then(res => {
            if (res.data.status === "success") {
                toast.success("Order created successfully.");
                onReset();
            }
        }).catch(err => toast.error(err.message));
        setCreatingOrder(false);

    }

    const onRemoveProduct = (id, price_in_paisa) => {
        setData(prev => prev.filter(pro => pro.id !== id));
        setTotalInPaisa(prev => prev - price_in_paisa)
    }

    const onReset = () => {
        setData([]);
        setSearch("");
        setIsLoadingData(false);
        setTotalInPaisa(0);
        onHide();
        setName("");
        setPhone("");
    }

    const onIncreaseQuantity = (id) => {
        const prod = data.filter(pro => pro.id === id)[0]
        setTotalInPaisa(prev => prev + prod.price_in_paisa)
        setData(prev => [...prev.map(pro => {
            if (pro.id === id) return ({ ...prod, "quantity": prod.quantity + 1 });
            else return pro;
        })]);
    }

    const onDecreaseQuantity = (id) => {
        const prod = data.filter(pro => pro.id === id)[0]
        setTotalInPaisa(prev => prev - prod.price_in_paisa)
        if (prod.quantity === 1) {
            setData(prev => prev.filter(pro => pro.id !== id));
        } else {
            setData(prev => prev.map(pro => {
                if (pro.id === id) return ({ ...prod, "quantity": prod.quantity - 1 });
                else return pro;
            }));
        }
    }

    const onSelectProduct = (val) => {
        const addedOnes = data.filter(pro => pro.id === val.value)
        if (!!addedOnes.length) {
            const added = addedOnes[0];
            setData(prev => [...prev.filter(pro => pro.id !== val.value), { ...added, "quantity": added.quantity + 1 }]);
        } else {
            setData(prev => [...prev.filter(pro => pro.id !== val.value), { ...val, "quantity": 1 }]);
        }
        setSelectedOption(null);
        setTotalInPaisa(prev => prev + val.price_in_paisa)
    }

    const fetchProduct = async (page = 1) => {
        const payload = {
            page
        };
        if (!!search) {
            payload["search"] = search;
        }
        setIsLoadingData(true);
        await filterProductsAPI(payload).then(res => {
            if (res.data.status === "success") {
                if (page === 1) {
                    setProducts(res.data.data);
                } else {
                    setProducts(prev => [...prev, ...res.data.data]);
                }
                if (!!search && res.data.totalPages > page) {
                    fetchProduct(page + 1);
                }
            }
        }).catch(err => toast.error(err.message));
        setIsLoadingData(false);
    }

    const fetchQrCodes = async () => {
        await getQrCodesAPI().then(res => {
            if (res.data.status === "success") {
                let dataToSet = res.data.data.filter(qr => !qr.is_diabled).map(qr => qr.tableName);
                setTables(dataToSet);
                if (tableName === "Dashboard"){
                    if(dataToSet.length === 0){
                        toast("Tables are not added yet");
                    }else{
                        setSelectedTable(dataToSet[0]);
                    }
                }
            } else {
                toast.error(res.data.message);
            }
        }).catch(err => toast.error(err.message));
    }


    useEffect(() => {
        if (!isLoadingData && show) {
            fetchProduct();
            fetchQrCodes();
        }
    }, [show])

    useEffect(()=>{
        if(!!tableName){
            setSelectedTable(tableName);
        }
    }, [tableName])


    return (
        <Modal
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            keyboard={false}
            onHide={onHide}
        >
            <Modal.Header closeButton id='image_modal_header'>
                <Modal.Title id="contained-modal-title-vcenter" className='d-flex align-items-center'>
                    <h4 className='m-0'>Create Order</h4>
                    <div className="form-group my-0 mx-1">
                        <input
                            style={{ width: '210px' }}
                            className="form-control"
                            placeholder="Customer name (optional)"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div className="form-group my-0 mx-1">
                        <input
                            type='number'
                            style={{ width: '210px' }}
                            className="form-control"
                            placeholder="Contact No. (optional)"
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                        />
                    </div>
                    <div className="form-group my-0 mx-1">
                        <Select
                            options={tables.map(tb => ({ "label": tb, "value": tb }))}
                            value={{ "label": selectedTable, "value": selectedTable }}
                            onChange={val => setSelectedTable(val.value)}
                            placeholder="Table"
                            className="form-control p-0 minwidthforthetableselect"
                        />
                    </div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='createOrder-main'>
                {data.map((pro, index) =>
                    <Card key={index} className='settings-card py-2 px-3 mb-1 w-100 flex-row d-flex justify-content-between'>
                        <div>
                            {pro.name}
                        </div>
                        <div className='d-flex justify-content-between align-items-center'>
                            <img className='cursor-pointer' onClick={() => onDecreaseQuantity(pro.id)} width="22px" src='/assets/svgs/minusred.svg' alt='minus' />
                            <p className='m-auto text-end fw-bold text-center' style={{ minWidth: '35px' }}>{pro.quantity}</p>
                            <img className='cursor-pointer' onClick={() => onIncreaseQuantity(pro.id)} width="22px" src='/assets/svgs/plusgreen.svg' alt='plus' />
                            <p className='m-auto text-end' style={{ minWidth: '100px' }}>₹{(pro.price_in_paisa / 100).toFixed(2)}</p>
                            <p className='my-auto mx-1'>|</p>
                            <img onClick={() => onRemoveProduct(pro.id, pro.price_in_paisa)} className='cursor-pointer' src='/assets/svgs/deleteRed.svg' width="26px" alt='delete' />
                        </div>
                    </Card>
                )}
            </Modal.Body>
            <Modal.Footer>
                <form className='m-0 p-0 w-100' onSubmit={onSave}>
                    <div className='w-100 m-0 p-0 mb-1'>
                        <Select
                            value={selectedOption}
                            onChange={onSelectProduct}
                            onInputChange={val => setSearch(val)}
                            options={products.map(pro => ({ ...pro, "label": `${pro.name} | ₹${(pro.price_in_paisa / 100).toFixed(2)}`, "value": pro.id }))}
                            menuPlacement="top"
                            placeholder="Type or select from here"
                        />
                    </div>
                    <div className='w-100 d-flex justify-content-between align-items-cente'>
                        <div>
                            <Button className='mr-2 btn btn-success' disabled={!data.length} type='submit' >Create</Button>
                            <Button className='mx-2 btn btn-secondary' onClick={onReset}>Cancel</Button>
                        </div>
                        <h6 className='mx-0 my-auto fw-bolder'>Total: ₹{(totalInPaisa / 100).toFixed(2)}</h6>
                    </div>
                </form>
            </Modal.Footer>
        </Modal>
    );
}

export default CreateOrder;