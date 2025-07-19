import React from 'react'
import { BookOpen, Hash, Layers, Target } from 'lucide-react'

export const SearchIcons = {
    renderCourseIcon: () => (
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
            <BookOpen size={16} className="text-blue-600" />
        </div>
    ),

    renderTopicIcon: () => (
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
            <Hash size={16} className="text-purple-600" />
        </div>
    ),

    renderSubtopicIcon: () => (
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center">
            <Layers size={16} className="text-emerald-600" />
        </div>
    ),

    renderLearningObjectiveIcon: () => (
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center">
            <Target size={16} className="text-red-600" />
        </div>
    ),
}
