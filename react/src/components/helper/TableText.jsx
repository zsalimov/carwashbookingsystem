import React from 'react'
import { Link } from 'react-router-dom'

export default function TableText(props) {
    const { text, link, linkText } = props
           console.log(link)
    return (
        <>
            <div className='card animated fadeInDown'>
                <table>
                    <thead>
                        <tr>
                            {link === null ?
                                (<th className='text-center'>
                                     <progress value={30} />

                                </th>)

                                : (<th className='text-center'>
                                       {text} 
                                    <button className='btn-add'>
                                 
                                        <Link to={link} style={{ textDecoration: 'none', float: 'right' }}>{linkText}</Link>
                                    </button>

                                </th>)
                            }
                        </tr>
                    </thead>
                </table>
            </div>
        </>
    )
}
