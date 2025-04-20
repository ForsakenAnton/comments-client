import CommentsSection from './comments/CommentsSection';
import CommentsProvider from './comments/CommentsProvider';

import './App.css'

function App() {

  return (
    <>
      <h1>Comments App</h1>
      <CommentsProvider>
        <section className='comment-section-wrapper'>
          <CommentsSection />
        </section>
      </CommentsProvider>
    </>
  )
}

export default App
