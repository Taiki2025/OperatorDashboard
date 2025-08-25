// 品質評価ダッシュボード管理クラス
class QualityDashboard {
    constructor() {
        this.currentFilters = {
            period: 'week',
            category: 'all',
            viewType: 'team'
        };
        
        this.teamData = [
            { name: 'チームA', serviceLevel: 95.2, responseTime: '02:15', satisfaction: 4.8, resolved: 92, trend: 'up', change: '+2.1%' },
            { name: 'チームB', serviceLevel: 93.8, responseTime: '02:32', satisfaction: 4.7, resolved: 89, trend: 'up', change: '+1.5%' },
            { name: 'チームC', serviceLevel: 92.1, responseTime: '02:45', satisfaction: 4.6, resolved: 87, trend: 'down', change: '-0.8%' },
            { name: 'チームD', serviceLevel: 91.5, responseTime: '03:02', satisfaction: 4.5, resolved: 85, trend: 'up', change: '+0.9%' },
            { name: 'チームE', serviceLevel: 89.7, responseTime: '03:18', satisfaction: 4.3, resolved: 82, trend: 'down', change: '-1.2%' }
        ];
        
        this.individualData = [
            { name: '田中 太郎', team: 'チームA', serviceLevel: 97.5, responseTime: '01:58', satisfaction: 4.9, resolved: 95, trend: 'up', change: '+3.2%' },
            { name: '佐藤 花子', team: 'チームB', serviceLevel: 96.8, responseTime: '02:05', satisfaction: 4.8, resolved: 93, trend: 'up', change: '+2.8%' },
            { name: '鈴木 一郎', team: 'チームA', serviceLevel: 95.9, responseTime: '02:12', satisfaction: 4.7, resolved: 91, trend: 'up', change: '+1.9%' },
            { name: '山田 美代子', team: 'チームC', serviceLevel: 94.3, responseTime: '02:28', satisfaction: 4.6, resolved: 88, trend: 'up', change: '+1.4%' },
            { name: '高橋 次郎', team: 'チームB', serviceLevel: 93.7, responseTime: '02:35', satisfaction: 4.5, resolved: 86, trend: 'down', change: '-0.5%' }
        ];
        
        this.performanceHistory = [
            { date: '月', teamA: 94.2, teamB: 92.8, teamC: 91.5, teamD: 90.2, teamE: 88.9 },
            { date: '火', teamA: 94.8, teamB: 93.1, teamC: 91.8, teamD: 90.8, teamE: 89.2 },
            { date: '水', teamA: 95.1, teamB: 93.5, teamC: 92.0, teamD: 91.1, teamE: 89.5 },
            { date: '木', teamA: 95.0, teamB: 93.6, teamC: 92.2, teamD: 91.3, teamE: 89.8 },
            { date: '金', teamA: 95.2, teamB: 93.8, teamC: 92.1, teamD: 91.5, teamE: 89.7 }
        ];
        
        this.init();
    }
    
    init() {
        this.updateTimestamp();
        this.setupEventListeners();
        this.updateOverviewMetrics();
        this.renderRanking();
        this.initChart();
        this.renderAnalysis();
        this.startRealTimeUpdates();
    }
    
    updateTimestamp() {
        const now = new Date();
        const timestamp = now.toLocaleString('ja-JP', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        document.getElementById('lastUpdated').textContent = timestamp;
    }
    
    setupEventListeners() {
        // フィルター適用ボタン
        document.getElementById('applyFilter').addEventListener('click', () => {
            this.applyFilters();
        });
        
        // フィルター要素の変更検知
        document.getElementById('viewType').addEventListener('change', (e) => {
            this.currentFilters.viewType = e.target.value;
            this.updateRankingTitle();
        });
        
        document.getElementById('periodFilter').addEventListener('change', (e) => {
            this.currentFilters.period = e.target.value;
            this.updateRankingPeriod();
        });
        
        document.getElementById('categoryFilter').addEventListener('change', (e) => {
            this.currentFilters.category = e.target.value;
            this.updateRankingPeriod();
        });
    }
    
    applyFilters() {
        this.currentFilters.period = document.getElementById('periodFilter').value;
        this.currentFilters.category = document.getElementById('categoryFilter').value;
        this.currentFilters.viewType = document.getElementById('viewType').value;
        
        this.updateOverviewMetrics();
        this.renderRanking();
        this.updateChart();
        this.renderAnalysis();
        this.updateRankingTitle();
        this.updateRankingPeriod();
    }
    
    updateRankingTitle() {
        const title = this.currentFilters.viewType === 'team' ? 
            'チーム別サービスレベル Top5' : '個人別サービスレベル Top5';
        document.getElementById('rankingTitle').textContent = title;
    }
    
    updateRankingPeriod() {
        const periodText = this.getPeriodText(this.currentFilters.period);
        const categoryText = this.currentFilters.category === 'all' ? '全カテゴリ' : this.currentFilters.category;
        document.getElementById('rankingPeriod').textContent = `${periodText} - ${categoryText}`;
    }
    
    getPeriodText(period) {
        const periodMap = {
            'today': '今日',
            'week': '今週',
            'month': '今月',
            'quarter': '四半期'
        };
        return periodMap[period] || '今週';
    }
    
    updateOverviewMetrics() {
        // フィルターに基づいてメトリクスを更新
        const data = this.currentFilters.viewType === 'team' ? this.teamData : this.individualData;
        
        const avgServiceLevel = (data.reduce((sum, item) => sum + item.serviceLevel, 0) / data.length).toFixed(1);
        const avgResponseTime = this.calculateAverageTime(data.map(item => item.responseTime));
        const avgSatisfaction = (data.reduce((sum, item) => sum + item.satisfaction, 0) / data.length).toFixed(1);
        const avgResolved = (data.reduce((sum, item) => sum + item.resolved, 0) / data.length).toFixed(1);
        
        // メトリクス更新と成果表示
        document.getElementById('avgServiceLevel').textContent = `${avgServiceLevel}%`;
        document.getElementById('avgResponseTime').textContent = avgResponseTime;
        document.getElementById('customerSatisfaction').textContent = avgSatisfaction;
        document.getElementById('resolutionRate').textContent = `${avgResolved}%`;
        
        // 成果インジケーターの追加
        this.updatePerformanceIndicators(avgServiceLevel, avgSatisfaction, avgResolved);
    }
    
    calculateAverageTime(times) {
        const totalSeconds = times.reduce((sum, time) => {
            const [minutes, seconds] = time.split(':').map(Number);
            return sum + (minutes * 60) + seconds;
        }, 0);
        
        const avgSeconds = Math.round(totalSeconds / times.length);
        const minutes = Math.floor(avgSeconds / 60);
        const seconds = avgSeconds % 60;
        
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    renderRanking() {
        const container = document.getElementById('rankingList');
        container.innerHTML = '';
        
        const data = this.currentFilters.viewType === 'team' ? this.teamData : this.individualData;
        const sortedData = [...data].sort((a, b) => b.serviceLevel - a.serviceLevel).slice(0, 5);
        
        sortedData.forEach((item, index) => {
            const rankingItem = document.createElement('div');
            rankingItem.className = `ranking-item rank-${index + 1}`;
            
            const teamInfo = this.currentFilters.viewType === 'individual' ? 
                `<div class="ranking-details">${item.team} | 応答時間: ${item.responseTime}</div>` :
                `<div class="ranking-details">応答時間: ${item.responseTime} | 満足度: ${item.satisfaction}</div>`;
            
            // メダルと成果バッジの生成
            const medal = this.getMedalDisplay(index + 1);
            const achievementBadges = this.getAchievementBadges(item, index + 1);
            
            rankingItem.innerHTML = `
                <div class="ranking-position">${medal}${index + 1}</div>
                <div class="ranking-info">
                    <div class="ranking-name">${item.name}${achievementBadges}</div>
                    ${teamInfo}
                </div>
                <div class="ranking-score">
                    <div class="ranking-percentage">${item.serviceLevel}%</div>
                    <div class="ranking-change ${item.trend}">${item.change}</div>
                </div>
            `;
            
            container.appendChild(rankingItem);
        });
    }

    getMedalDisplay(rank) {
        switch(rank) {
            case 1:
                return '<span class="medal gold">🥇</span>';
            case 2:
                return '<span class="medal silver">🥈</span>';
            case 3:
                return '<span class="medal bronze">🥉</span>';
            default:
                return '';
        }
    }

    getAchievementBadges(item, rank) {
        const badges = [];
        
        // 1位の特別バッジ
        if (rank === 1) {
            badges.push('<span class="achievement-badge">👑 チャンピオン</span>');
        }
        
        // 高パフォーマンスバッジ
        if (item.serviceLevel >= 95) {
            badges.push('<span class="achievement-badge improvement">🌟 エクセレント</span>');
        }
        
        // 改善トレンドバッジ
        if (item.trend === 'up' && parseFloat(item.change.replace('%', '').replace('+', '')) >= 2) {
            badges.push('<span class="achievement-badge streak">🚀 急上昇</span>');
        }
        
        // 顧客満足度バッジ（個人データのみ）
        if (item.satisfaction && item.satisfaction >= 4.8) {
            badges.push('<span class="achievement-badge">😊 CS王</span>');
        }
        
        // 連続記録バッジ（ランダムで生成）
        if (Math.random() < 0.3 && rank <= 3) {
            const streakDays = Math.floor(Math.random() * 7) + 3;
            badges.push(`<span class="achievement-badge streak">🔥 ${streakDays}日連続</span>`);
        }
        
        return badges.join('');
    }

    updatePerformanceIndicators(serviceLevel, satisfaction, resolved) {
        // パフォーマンス概要カードに成果表示を追加
        const serviceLevelCard = document.querySelector('.overview-card:nth-child(1)');
        const satisfactionCard = document.querySelector('.overview-card:nth-child(3)');
        const resolutionCard = document.querySelector('.overview-card:nth-child(4)');
        
        // 既存のバッジを削除
        [serviceLevelCard, satisfactionCard, resolutionCard].forEach(card => {
            const existingBadge = card.querySelector('.performance-badge');
            if (existingBadge) {
                existingBadge.remove();
            }
        });
        
        // サービスレベルの成果バッジ
        if (serviceLevel >= 93) {
            const badge = document.createElement('div');
            badge.className = 'performance-badge excellent';
            badge.innerHTML = '🎯 目標達成!';
            serviceLevelCard.appendChild(badge);
        }
        
        // 顧客満足度の成果バッジ
        if (satisfaction >= 4.6) {
            const badge = document.createElement('div');
            badge.className = 'performance-badge excellent';
            badge.innerHTML = '😊 高評価!';
            satisfactionCard.appendChild(badge);
        }
        
        // 解決率の成果バッジ
        if (resolved >= 90) {
            const badge = document.createElement('div');
            badge.className = 'performance-badge excellent';
            badge.innerHTML = '✨ 優秀!';
            resolutionCard.appendChild(badge);
        }
    }
    
    initChart() {
        const ctx = document.getElementById('performanceChart').getContext('2d');
        
        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.performanceHistory.map(item => item.date),
                datasets: [
                    {
                        label: 'チームA',
                        data: this.performanceHistory.map(item => item.teamA),
                        borderColor: '#e74c3c',
                        backgroundColor: 'rgba(231, 76, 60, 0.1)',
                        tension: 0.4
                    },
                    {
                        label: 'チームB',
                        data: this.performanceHistory.map(item => item.teamB),
                        borderColor: '#f39c12',
                        backgroundColor: 'rgba(243, 156, 18, 0.1)',
                        tension: 0.4
                    },
                    {
                        label: 'チームC',
                        data: this.performanceHistory.map(item => item.teamC),
                        borderColor: '#27ae60',
                        backgroundColor: 'rgba(39, 174, 96, 0.1)',
                        tension: 0.4
                    },
                    {
                        label: 'チームD',
                        data: this.performanceHistory.map(item => item.teamD),
                        borderColor: '#3498db',
                        backgroundColor: 'rgba(52, 152, 219, 0.1)',
                        tension: 0.4
                    },
                    {
                        label: 'チームE',
                        data: this.performanceHistory.map(item => item.teamE),
                        borderColor: '#9b59b6',
                        backgroundColor: 'rgba(155, 89, 182, 0.1)',
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            color: '#000'
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 85,
                        max: 100,
                        ticks: {
                            color: '#000',
                            callback: function(value) {
                                return value + '%';
                            }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    },
                    x: {
                        ticks: {
                            color: '#000'
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    }
                }
            }
        });
    }
    
    updateChart() {
        // フィルターに応じてチャートデータを更新
        if (this.chart) {
            this.chart.update();
        }
    }
    
    renderAnalysis() {
        const container = document.getElementById('analysisGrid');
        container.innerHTML = '';
        
        const analysisData = [
            {
                title: '改善ポイント',
                content: 'チームCの応答時間が平均を上回っています。技術的な問い合わせの対応手順を見直すことで、効率を改善できる可能性があります。'
            },
            {
                title: '好調な指標',
                content: 'チームAは全ての指標で優秀な成績を収めています。他チームへのベストプラクティス共有を検討してください。'
            },
            {
                title: '今週のトレンド',
                content: '全体的にサービスレベルが向上傾向にあります。特に新規開通の問い合わせ対応が改善されています。'
            },
            {
                title: '推奨アクション',
                content: '個人別の分析では、田中さんと佐藤さんが特に優秀です。メンタリング制度の導入を検討してみてください。'
            }
        ];
        
        analysisData.forEach(item => {
            const analysisItem = document.createElement('div');
            analysisItem.className = 'analysis-item';
            
            analysisItem.innerHTML = `
                <div class="analysis-title">${item.title}</div>
                <div class="analysis-content">${item.content}</div>
            `;
            
            container.appendChild(analysisItem);
        });
    }
    
    startRealTimeUpdates() {
        setInterval(() => {
            this.updateTimestamp();
            this.simulateDataChanges();
            this.updateOverviewMetrics();
            this.renderRanking();
        }, 10000); // 10秒ごとに更新
    }
    
    simulateDataChanges() {
        // データの小さな変動をシミュレート
        [...this.teamData, ...this.individualData].forEach(item => {
            if (Math.random() < 0.3) {
                const change = (Math.random() - 0.5) * 2; // -1.0 to +1.0
                item.serviceLevel = Math.max(80, Math.min(100, item.serviceLevel + change));
                item.serviceLevel = Math.round(item.serviceLevel * 10) / 10;
            }
        });
    }
}

// ページ読み込み時に初期化
document.addEventListener('DOMContentLoaded', () => {
    try {
        console.log('Initializing Quality Dashboard...');
        const qualityDashboard = new QualityDashboard();
        console.log('Quality Dashboard initialized successfully');
    } catch (error) {
        console.error('Failed to initialize Quality Dashboard:', error);
    }
});
