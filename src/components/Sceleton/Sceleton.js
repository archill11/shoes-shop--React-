import ContentLoader from "react-content-loader"

const Sceleton = (props) => (
  <ContentLoader 
    speed={2}
    width={225}
    height={300}
    viewBox="0 0 225 300"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="0" rx="42" ry="42" width="225" height="143" /> 
    <rect x="0" y="189" rx="9" ry="9" width="225" height="22" /> 
    <rect x="0" y="234" rx="9" ry="9" width="133" height="17" /> 
    <rect x="0" y="278" rx="9" ry="9" width="134" height="21" /> 
    <rect x="151" y="239" rx="12" ry="12" width="65" height="53" />
  </ContentLoader>
)

export {Sceleton}