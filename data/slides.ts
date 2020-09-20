export type Slide = {
  id: string
  key: string
  type: string
  heading: string
  description: string
  color: string
}

export default [
  {
    id: "1",
    key: "first",
    type: 'Some Type',
    heading: 'Some heading',
    description: "Lorem ipsum dolor sit amet.",
    color: "#A0ECD0"
  },
  {
    id: "2",
    key: "two",
    type: 'Some Type 2',
    heading: 'Some heading 2',
    description: "Lorem ipsum dolor sit amet.",
    color: "#A0ECD0"
  },
  {
    id: "3",
    key: "three",
    type: 'Some Type 3',
    heading: 'Some heading 3',
    description: "Lorem ipsum dolor sit amet.",
    color: "#A0ECD0"
  }
]