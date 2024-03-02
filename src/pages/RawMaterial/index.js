import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { addRawMaterialAPI, getRawMaterialsAPI } from '../../apis/common'
import toast from 'react-hot-toast';
import ShowUnitsBox from '../../components/ShowUnitsBox';
import ShowEditMatBox from '../../components/ShowEditMatBox';
import ShowQuantityDetailedBox from '../../components/ShowQuantityDetailedBox';

function RawMaterial() {

    const rawMaterialTemplate = {
        "name": "",
        "quantity": "",
        "unit": ""
    }

    const [rawMaterials, setRawMaterials] = useState([]);
    const [unitOptions, setUnitOptions] = useState([]);
    const [showUnitsBox, setShowUnitsBox] = useState(false);
    const [editMat, setEditMat] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [quantityDetailsBox, setQuantityDetailsBox] = useState(null);

    const fetchData = async () => {
        await getRawMaterialsAPI().then(res => {
            if (res.data.status === "success") {
                setRawMaterials(res.data.data);
                setUnitOptions(res.data.units);
            } else toast.error(res.data.message)
        }).catch(err => toast.error(err.message))
    }

    useEffect(() => {
        fetchData();
    }, [])

    const onAddOrUpdate = async (onCloseCanvas) => {
        if (isSaving) {
            return;
        }
        if (!editMat.name) {
            toast.error("Please provide the name.");
            return;
        }
        if (!editMat.quantity) {
            toast.error("Please provide the quantity.");
            return;
        }
        if (!editMat.unit) {
            toast.error("Please provide the unit.");
            return;
        }
        setIsSaving(true);
        const savingToast = toast.loading("Saving...", { duration: 20000 });
        await addRawMaterialAPI(editMat).then(res => {
            if (res.data.status === "success") {
                if (!!editMat.id) {
                    setRawMaterials(prev => prev.map(mat => (mat.id === editMat.id ? res.data.data : mat)));
                } else {
                    setRawMaterials(prev => [res.data.data, ...prev]);
                }
                toast.success("Saved Successfully.");
                onCloseCanvas();
            } else {
                toast.error(res.data.message);
            }
        }).catch(err => toast.error(err.message));
        toast.dismiss(savingToast);
        setIsSaving(false);
    }

    const onUpdateQuantity = (id, data) => {
        setRawMaterials(prev => prev.map(mat => (mat.id === id ? data : mat)));
    }

    return (
        <>
            {showUnitsBox && <ShowUnitsBox onclose={() => setShowUnitsBox(false)} units={unitOptions} setUnits={setUnitOptions} />}
            {!!editMat && <ShowEditMatBox onclose={() => setEditMat(null)} editMat={editMat} setEditMat={setEditMat} unitOptions={unitOptions} onAddOrUpdate={onAddOrUpdate} />}
            {!!quantityDetailsBox && <ShowQuantityDetailedBox onclose={() => setQuantityDetailsBox(null)} quantityDetails={quantityDetailsBox} onUpdateQuantity={onUpdateQuantity} />}
            <Card className='settings-card shadow-lg p-4 ms-4 border-none border-15'>
                <div className='d-flex'>
                    <h3 className='h3'>Raw Material Management</h3>
                    <div>
                        <button onClick={() => setEditMat({ ...rawMaterialTemplate })} className='btn btn-primary btn-sm ms-4'>Add New</button>
                        <button onClick={() => setShowUnitsBox(true)} className='btn btn-primary btn-sm ms-2'>Units</button>
                    </div>
                </div>
                <hr className='m-0' />

                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Unit</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rawMaterials.map((material, ind) =>
                            <tr key={ind}>
                                <td>{material.name}</td>
                                <td>{material.quantity}</td>
                                <td>{material.unit}</td>
                                <td style={{ width: "200px" }}>
                                    <span className='link-primary cursor-pointer' onClick={() => setEditMat(material)} >Edit</span>
                                    <span className='link-primary cursor-pointer ms-3' onClick={() => setQuantityDetailsBox(material)} >Quantity</span>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </Card>
        </>
    )
}

export default RawMaterial
