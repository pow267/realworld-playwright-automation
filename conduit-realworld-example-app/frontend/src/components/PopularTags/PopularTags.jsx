import { useEffect, useState } from "react";
import getTags from "../../services/getTags";
import TagButton from "./TagButton";

function PopularTags() {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const visibleTags = [...new Set(tags)].slice(0, 50);

  useEffect(() => {
    setLoading(true);

    getTags()
      .then(setTags)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <aside className="col-md-3">
      <div className="sidebar">
        <h6>Popular Tags</h6>
        <div className="tag-list">
          {visibleTags.length > 0 ? (
            <TagButton tagsList={visibleTags} />
          ) : loading ? (
            <p>Loading tags...</p>
          ) : (
            <p>Tags list not available</p>
          )}
        </div>
      </div>
    </aside>
  );
}

export default PopularTags;
