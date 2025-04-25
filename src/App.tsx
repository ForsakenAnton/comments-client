import CommentsSection from './comments/CommentsSection';
import CommentsProvider from './comments/CommentsProvider';

import './App.css'
import Title from './components/Title';
import MotionWrapper from './motion/MotionWrapper';

function App() {

  return (
    <>
      <Title
        containerClassName='title'
        textClassName='title-text'
        text='Comments App'
      />
      <CommentsProvider>
        <MotionWrapper duration={1.5}>
          <section className='comment-section-wrapper'>
            <CommentsSection />
          </section>
        </MotionWrapper>
      </CommentsProvider>
    </>
  )
}

export default App
