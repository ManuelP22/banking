import HeaderBox from '@/components/_components/HeaderBox'
import RightSidebar from '@/components/_components/RightSidebar'
import TotalBalanceBox from '@/components/_components/TotalBalanceBox'
import React from 'react'

const Home = () => {
  const loggedIn = { firstName: 'Manuel', lastName: 'Perez', email: 'manuelperezp22@hotmail.com' }
  return (
    <section className='home'>
      <div className='home-content'>
        <header className='home-header'>
          <HeaderBox
            type="greeting"
            title="Welcome,"
            user={loggedIn?.firstName || 'Guest'}
            subtext="Access and manage your account and transaction efficiently."
          />

          <TotalBalanceBox
            accounts={[]}
            totalBanks={3}
            totalCurrentBalance={270366.25}

          />
        </header>

        RECENT TRANSACTIONS
      </div>

      <RightSidebar
        user={loggedIn}
        transactions={[]}
        banks={[{ currentBalance: 81.543}, { currentBalance: 54.106 }]}
      />
    </section>
  )
}

export default Home