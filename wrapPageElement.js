import React from "react"
import { GlobalLayout } from "./src/components/GlobalLayout"

// Pass all props (hence the ...props) to the layout component so it has access to things like pageContext or location
const wrapPageElement = ({ element, props }) => (
  <GlobalLayout {...props}>{element}</GlobalLayout>
)

export default wrapPageElement