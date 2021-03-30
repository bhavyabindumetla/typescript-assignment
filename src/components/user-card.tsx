import React, { useCallback } from 'react'

interface Props {
    userName: string;
    sno: number;
    handleRemove: (index: number) => void;
}

const UserCard: React.FC<Props> = ({userName, sno, handleRemove}) => {
    const handleClick = useCallback(()=>{
        handleRemove(sno-1)
    },[sno, handleRemove])
    return (
        <div className="d-flex justify-content-between m-2 align-items-center">
            <p className="mr-4">
                {sno}. {userName}
            </p>
            <button className="border-0 btn-danger alert p-2" title={"remove"+sno} onClick={handleClick}>Remove</button>
        </div>
    )
}

export default React.memo(UserCard);