import React from 'react'
import { Routes, Route, Outlet, Link, useLocation } from 'react-router-dom'
import StudyTimetablev2 from '@features/StudyTimetablev2/StudyTimetablev2'
import { BookOpen, Calendar, FileText, Layers } from 'lucide-react'
import MySubjects from '@features/MySubjects/MySubjects'
import FlashCardList from '@features/FlashCards/FlashCardList/FlashCardList'

const MyLearning = () => {
    const location = useLocation()

    const isActive = (path: any) => location.pathname === path

    const getLinkClasses = (path: any) => {
        const baseClasses =
            'px-4 py-2 text-sm font-medium transition-all duration-200 border-b-2'

        if (isActive(path)) {
            return `${baseClasses} text-secondary border-secondary bg-secondary-50`
        }

        return `${baseClasses} text-virtu_grey border-transparent hover:text-secondary hover:border-secondary-300`
    }

    return (
        <div className="min-h-screen bg-gray-50  font-opensans">
            <div className="">
                <div className="max-w-7xl mx-auto">
                    <div className="py-8">
                        <h1 className="text-3xl font-bold text-secondary-700 mb-2 font-mier">
                            My Learning
                        </h1>
                        <p className="text-base text-virtu_grey max-w-2xl">
                            Manage your study schedule, view subject progress,
                            practice flashcards, and track your mock exam
                            results.
                        </p>
                    </div>

                    <div className="flex space-x-0 -mb-px">
                        <Link
                            to="/my-learning"
                            className={getLinkClasses('/my-learning')}
                        >
                            <Calendar className="w-4 h-4 mr-2 inline-block" />
                            TimeTable
                        </Link>
                        <Link
                            to="/my-learning/subjects"
                            className={getLinkClasses('/my-learning/subjects')}
                        >
                            <BookOpen className="w-4 h-4 mr-2 inline-block" />
                            My Subjects
                        </Link>
                        <Link
                            to="/my-learning/progress"
                            className={getLinkClasses('/my-learning/progress')}
                        >
                            <FileText className="w-4 h-4 mr-2 inline-block" />
                            Maneb Mock Exams
                        </Link>
                        <Link
                            to="/my-learning/flashcards"
                            className={getLinkClasses(
                                '/my-learning/flashcards'
                            )}
                        >
                            <Layers className="w-4 h-4 mr-2 inline-block" />
                            FlashCards
                        </Link>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div>
                <Routes>
                    <Route path="" element={<MyLearningLayout />}>
                        <Route index element={<StudyTimetablev2 />} />
                        <Route path="subjects" element={<MySubjects />} />
                        <Route path="flashcards" element={<FlashCardList />} />
                        {/*<Route path="resources" element={<Resources />} />*/}
                    </Route>
                </Routes>
            </div>
        </div>
    )
}

const MyLearningLayout = () => {
    return <Outlet />
}

export default MyLearning
