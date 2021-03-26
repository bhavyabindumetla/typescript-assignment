import React, { useCallback } from 'react'

interface Props {
    userName: string;
    sno: number;
    handleRemove: (index: number) => void;
}

const UserCard: React.FC<Props> = ({userName, sno, handleRemove}) =>{
    const handelClick = useCallback((): void => {
        handleRemove(sno-1)
    }, [handleRemove, sno])
    
    return (
        <div className="d-flex justify-content-between m-2 align-items-center">
            <p className="mr-4">
                {sno}. {userName}
            </p>
            <button className="border-0 btn-danger alert p-2" onClick={handelClick}>Remove</button>
        </div>
    )
}

export default React.memo(UserCard);