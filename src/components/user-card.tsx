import React from 'react'

interface Props {
    userName: string;
    sno: number;
    handleRemove: (index: number) => void;
}

const UserCard: React.FC<Props> = ({userName, sno, handleRemove}) =>(

    <div className="d-flex justify-content-between m-2 align-items-center">
        <p className="mr-4">
            {sno}. {userName}
        </p>
        <button className="border-0 btn-danger alert p-2" onClick={()=>handleRemove(sno-1)}>Remove</button>
    </div>
)

export default React.memo(UserCard);