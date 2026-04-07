function ArticleTags({ tagList }) {
  return (
    tagList?.length > 0 && (
      <ul className="tag-list">
        {tagList.map((tag, index) => (
          <li key={`${tag}-${index}`} className="tag-default tag-pill tag-outline">
            {tag}
          </li>
        ))}
      </ul>
    )
  );
}

export default ArticleTags;
