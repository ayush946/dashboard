import './miniCard.css'

function MiniCard({maxV, minV}){
    return (
        <div class="card">
           <div className='max'>
                <div className='heading'>
                    Max
                </div>
                <div className='value'>
                    {maxV}
                </div>
           </div>
           <div className='max'>
           <div className='heading'>
                Min
            </div>
            <div className='value'>
                {minV}
            </div>
           </div>
        </div>
    )
}

export default MiniCard;