import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../Styles/Pages/Selected_articles/Topic_Stress.css';

const Topic_Stress = () => {
    const [showTips, setShowTips] = useState(false);
    const [stressLevel, setStressLevel] = useState(null);

    const handleTest = (level) => {
        setStressLevel(level);
    };

    return (
        <div className="stress-page">
            <header className="stress-header">
                <h1>Как справляться со стрессом в современном мире</h1>
                <p>Узнайте, как стресс влияет на вас и как с ним справляться</p>
            </header>

            <section className="stress-test">
                <h2>Пройдите мини-тест</h2>
                <p>Как вы себя чувствуете в последнее время?</p>
                <div className="test-options">
                    <button onClick={() => handleTest('низкий')}>Спокойно</button>
                    <button onClick={() => handleTest('средний')}>Немного тревожно</button>
                    <button onClick={() => handleTest('высокий')}>Постоянное напряжение</button>
                </div>
                {stressLevel && (
                    <div className="test-result">
                        <p>Ваш уровень стресса: <strong>{stressLevel}</strong></p>
                        {stressLevel === 'высокий' && <p>Рекомендуется практика дыхания и снижение нагрузки.</p>}
                        {stressLevel === 'средний' && <p>Попробуйте уделять больше времени себе.</p>}
                        {stressLevel === 'низкий' && <p>Вы хорошо справляетесь со стрессом!</p>}
                    </div>
                )}
            </section>

            <section className="stress-tips">
                <h2>Полезные техники</h2>
                <button className="toggle-btn" onClick={() => setShowTips(!showTips)}>
                    {showTips ? 'Скрыть техники' : 'Показать техники'}
                </button>
                {showTips && (
                    <ul className="tips-list">
                        <li>Дыхательные практики и медитация</li>
                        <li>Физическая активность: прогулки, йога, бег</li>
                        <li>Хобби и творчество: рисование, музыка, чтение</li>
                        <li>Соблюдение режима сна и отдыха</li>
                        <li>Общение с близкими и поддержка</li>
                        <li>Работа с психологом при необходимости</li>
                    </ul>
                )}
            </section>

            <footer className="stress-footer">
                <Link to="/" className="back-link">← Назад на главную</Link>
            </footer>
        </div>
    );
};

export default Topic_Stress;
