import CommentsSection from './comments/CommentsSection';
import CommentsProvider from './comments/CommentsProvider';

import './App.css'
import Title from './components/Title';

function App() {

  return (
    <>
      <Title
        containerClassName='title'
        textClassName='title-text'
        text='Comments App'
      />
      <CommentsProvider>
        <section className='comment-section-wrapper'>
          <CommentsSection />
        </section>
      </CommentsProvider>
    </>
  )
}

export default App
