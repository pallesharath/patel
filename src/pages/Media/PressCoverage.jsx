import  { useEffect, useState } from "react"
import { supabase } from "../../supabaseClient"
import "./PressCoverage.css"

function PressCoverage() {

  const [pressImages, setPressImages] = useState([])

  useEffect(() => {
    const fetchPressImages = async () => {
      try {
        const { data, error } = await supabase.storage
          .from('press')
          .list()

        if (error) {
          throw error
        }

        console.log("Press storage list:", data)

        const { data: linkRows, error: linkError } = await supabase
          .from('press_coverage')
          .select('file_name, url')
        if (linkError) {
          console.error("Press link fetch error:", linkError)
        }

        const sortedFiles = (data || []).slice().sort((a, b) => {
          const aTime = new Date(a.updated_at || a.created_at).getTime()
          const bTime = new Date(b.updated_at || b.created_at).getTime()
          return bTime - aTime
        })

        const linkMap = new Map((linkRows || []).map((row) => [row.file_name, row.url]))

        const imageItems = sortedFiles.map(file => {
          const { data: { publicUrl } } = supabase.storage
            .from('press')
            .getPublicUrl(file.name)
          console.log("Press public url for", file.name, "=", publicUrl)
          return {
            imageUrl: publicUrl,
            linkUrl: linkMap.get(file.name) || null,
          }
        })

        setPressImages(imageItems)
      } catch (error) {
        console.error("Error fetching press images:", error)
      }
    }

    fetchPressImages()
  }, [])

  return (

    <div className="press-page">

      <h1>Press Coverage</h1>

      <div className="press-gallery">

        {pressImages.map((img, index) => (
          img.linkUrl ? (
            <a key={index} href={img.linkUrl} target="_blank" rel="noreferrer" aria-label="Open press article">
              <img src={img.imageUrl} alt="press" />
            </a>
          ) : (
            <img key={index} src={img.imageUrl} alt="press" />
          )
        ))}

      </div>

      {/* Debug section removed as requested */}

    </div>

  )
}

export default PressCoverage
