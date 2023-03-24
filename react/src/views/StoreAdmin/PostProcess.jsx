import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Select from 'react-select';
import axiosClient from '../../axios-client'
import { useStateContext } from '../../contexts/ContextProvider'

export default function PostProcess() {
  const { id } = useParams(1)
  const [options, setOptions] = useState("");
  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useState([])
  const [postId, setPostId] = useState([])
  const [price, setPrice] = useState(5)
  const { setNotification } = useStateContext()

  const priceOptions = [
    { value: 3.99, label: "£ 3.99" },
    { value: 4.99, label: "£ 4.99" },
    { value: 6.99, label: "£ 6.99" },
    { value: 9.99, label: "£ 9.99" },
    { value: 14.99, label: "£ 14.99" },
    { value: 19.99, label: "£ 19.99" },
  ];

  useEffect(() => {
    fetchPosts();
    getUnusedPost()
  }, [])

  const fetchPosts = async () => {
    setLoading(true)
    const res = await axiosClient.get(`/post_processes/${id}`)
    setPosts(res.data)
    setLoading(false)
  }

  const onDelete = (v) => {
    if (!window.confirm(`Are you sure you want to delete ${v.ppName}?`)) {
      return
    }
    const payload = {
      wId: id,
      ppId: v.ppId
    }
    axiosClient.post(`/post_processes`, payload)
      .then(() => {
        setNotification("Post Process was successfully deleted!")
        fetchPosts()
        getUnusedPost()
      })
  }

  const getUnusedPost = () => {
    setLoading(true)
    axiosClient.post(`/post_processes/${id}`)
      .then(({ data }) => {
        setLoading(false)

        const postOptions = data.map(function (v) {
          return {
            value: v.ppId,
            label: v.ppName
          };
        });
        setOptions(postOptions);
      })
      .catch(() => {
        setLoading(false)
      })
  }

  var onAssign = (ev) => {
    console.log(postId)
    ev.preventDefault()
    const payload = {
      wppWasherId: id,
      wppPostProcessId: postId,
      wppPrice: price     // prevent extra controller changes and table column delete
    }
    axiosClient.post(`/add_post_processes`, payload)
      .then(() => {
        setNotification("Post Process was successfully assigned!")
        fetchPosts()
        getUnusedPost()
      })
      .catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      })


  }

  return (
    <>
      {!loading && posts.length > 0 &&
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}> {/*inline styling */}
            <h1> Supported Post Process </h1>
          </div>
          <div className='card animated fadeInDown'>
            <table>
              <thead>
                <tr>
                  <th>Post Process ID</th>
                  <th>Post Process Name</th>
                  <th>Post Process Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map(v => (
                  <tr key={v.ppId}>
                    <td>{v.ppId}</td>
                    <td>{v.ppName}</td>
                    <td>{v.wppPrice}</td>
                    <td>
                      <button onClick={ev => onDelete(v)} className="btn-delete">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      }
      {loading &&
        <div className='card animated fadeInDown'>
          <div className='text-center'>  Loading...  <progress value={50} /></div>
        </div>
      }
      <div>
        {!loading && options.length > 0 &&
          <form onSubmit={onAssign}>
            <label><h1>Add post process type to a washer</h1></label>

            <Select options={options} onChange={(ev) => { setPostId(ev.value) }} />
            
            <Select options={priceOptions}  defaultValue={priceOptions.filter(o => o.value === price)} onChange={(ev) => { setPrice(ev.value) }} />
            <br />
            <button className='btn'>Assign</button>
          </form>
        }
      </div>
    </>
  )
}
