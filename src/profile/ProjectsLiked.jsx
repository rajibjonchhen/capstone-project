import { useEffect } from 'react'

function ProjectsLiked() {

    const myInfo = useSelector(state => state.user.myInfo)
    useEffect(() => {
        console.log(myInfo)
    },[])

  return (
    <div>
        
    </div>
  )
}

export default ProjectsLiked