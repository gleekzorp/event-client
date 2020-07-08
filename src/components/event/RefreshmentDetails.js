import React, { useState } from 'react';

import AssignModal from '../modals/AssignModal';
import ReAssignModal from '../modals/ReAssignModal';
import api from '../../helpers/api';

const RefreshmentDetails = (props) => {
    const [assignModalIsOpen, setAssignModalIsOpen] = useState(false)
    const [reAssignModalIsOpen, setReAssignModalIsOpen] = useState(false)

    const handleModalClose = (modalName) => {
        if (modalName === 'assign') {
            setAssignModalIsOpen(false);
        } else {
            setReAssignModalIsOpen(false);
        }
    };

    const handleModalOpen = (modalName) => {
        if (modalName === 'assign') {
            setAssignModalIsOpen(true);
        } else {
            setReAssignModalIsOpen(true);
        }
    }

    const handleTakenBySubmit = (takenByName, assignmentType) => {
        api(
            {
                method: 'put',
                url: `${assignmentType}/${props.refreshment._id}`,
                data: {takenBy: takenByName}
            }
        )
        .then((res) => {
            if (assignmentType === "assign-takenBy") {
                handleModalClose('assign')
            } else {
                handleModalClose('reAssign')
            }
            props.handleSuccessfulEditTakenBy(res.data)
        })
    }

    const { refreshmentName, assigned, takenBy } = props.refreshment
    return (
        <div className="refreshment-details-wrapper">
            <AssignModal
                assignModalIsOpen={assignModalIsOpen}
                handleModalClose={handleModalClose}
                refreshment={props.refreshment}
                handleTakenBySubmit={handleTakenBySubmit}
            />
            <ReAssignModal
                reAssignModalIsOpen={reAssignModalIsOpen}
                handleModalClose={handleModalClose}
                refreshment={props.refreshment}
                handleTakenBySubmit={handleTakenBySubmit}
            />
            {assigned ? (
                <div className="refreshment-details-item assigned">
                    <div>{takenBy} is bringing this item</div>
                    <div className="refreshment-name">{refreshmentName}</div>
                    <div
                        onClick={() => handleModalOpen('reAssign')}
                        className="refreshment-assign-btn reAssign-btn"
                    >
                        Reassign Item
                    </div>   
                </div>
            ) : (
                <div className="refreshment-details-item re-assign">
                    <div className="refreshment-name">{refreshmentName}</div>
                    <div
                        onClick={() => handleModalOpen('assign')}
                        className="refreshment-assign-btn"
                    >
                        Bring Item
                    </div>
                </div>
            )}
        </div>
    );
}

export default RefreshmentDetails;