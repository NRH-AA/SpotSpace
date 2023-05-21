import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'

const MarkDownComponant = ({text}) => {
    return <ReactMarkdown children={text} remarkPlugins={[remarkGfm]}/>
};

export default MarkDownComponant;
