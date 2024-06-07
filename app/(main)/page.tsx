import { Metadata } from 'next';
import { Home } from './_components/Home'

export const metadata: Metadata = {
  title: 'Search For Events In Your City'
};

function MainPage() {
  return (
    <div>
      <Home /> 
    </div>
  )
}

export default MainPage