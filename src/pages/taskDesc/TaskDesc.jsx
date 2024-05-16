import React from 'react';
import BackButton from '../../components/BackButton';
import ProfileBlock from '../../components/ProfileBlock';

function TaskDesc() {
    return (
        <div>
            <header className='task_desc-header'> 
                <ProfileBlock />
            </header>
            <main className="task_desc-container">
                <div className="task_content">
                    <BackButton>Назад</BackButton>
                    <p className="task_title"></p>
                    <div className="task_text-container">
                        <div className="task_text-header">
                            <p className="task_header-title">Описание</p>
                            <p className="task_header-deadline"></p>
                        </div>
                        <div className="task_text-body"></div>
                    </div>
                </div>
                <div className="task_dev-container">
                    <p className="task_dev-header">Ответственные</p>
                    <div className="task_dev-bar">
                        <div className="task_bar-block">
                            <div className="task_bar_name">
                                <img src={require('../../media/profile_icon.svg').default} alt="manager" />
                                <p className="task_bar-title"></p>
                            </div>
                            <p className="task_bar-role"></p>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}

export default TaskDesc;