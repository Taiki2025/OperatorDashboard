// ダッシュボードデータ管理クラス
class RealTimeDashboard {
    constructor() {
        this.data = {
            totalContacts: 241,
            previousDayContacts: 215,
            weeklyAvgContacts: 198,
            serviceLevel: 94,
            previousServiceLevel: 91,
            weeklyAvgServiceLevel: 89,
            avgWaitTime: "02:51",
            previousAvgWaitTime: "03:12",
            weeklyAvgWaitTime: "03:28",
            maxWaitTime: "09:47",
            previousMaxWaitTime: "11:23",
            weeklyAvgMaxWaitTime: "12:15",
            operatorCount: 56,
            totalOperators: 80,
            activeOperators: 32,
            waitingOperators: 18,
            breakOperators: 6,
            offlineOperators: 24,
            inquiryData: [
                { category: "技術サポート", count: 89, percentage: 28, status: "high" },
                { category: "請求関連", count: 52, percentage: 16, status: "medium" },
                { category: "新規開通", count: 48, percentage: 15, status: "medium" },
                { category: "契約内容変更", count: 42, percentage: 13, status: "medium" },
                { category: "支払方法変更", count: 38, percentage: 12, status: "medium" },
                { category: "停電対応", count: 35, percentage: 11, status: "medium" },
                { category: "サービス変更", count: 28, percentage: 9, status: "low" },
                { category: "その他", count: 21, percentage: 7, status: "low" }
            ],
            activeInquiries: [
                { category: "技術サポート", agent: "田中", priority: "高", waitTime: "02:15", status: "対応中" },
                { category: "請求関連", agent: "佐藤", priority: "中", waitTime: "01:45", status: "対応中" },
                { category: "停電対応", agent: "鈴木", priority: "高", waitTime: "00:32", status: "対応中" },
                { category: "新規開通", agent: "山田", priority: "中", waitTime: "03:22", status: "対応中" },
                { category: "契約内容変更", agent: "高橋", priority: "低", waitTime: "01:08", status: "対応中" }
            ]
        };
        
        this.init();
        this.startRealTimeUpdates();
    }

    updateMiraikunComment() {
        const speechBubble = document.getElementById('speechBubble');
        const speechText = document.getElementById('speechText');
        const miraikunImg = document.getElementById('miraikunImg');
        
        if (!speechBubble || !speechText || !miraikunImg) return;
        
        const now = new Date();
        const hour = now.getHours();
        const minute = now.getMinutes();
        
        // 時間帯別のコメントパターン
        const comments = this.getTimeBasedComments(hour, minute);
        const randomComment = comments[Math.floor(Math.random() * comments.length)];
        
        // 吹き出しを一旦隠す
        speechBubble.style.opacity = '0';
        speechBubble.style.transform = 'scale(0.8) translateY(10px)';
        
        setTimeout(() => {
            speechText.textContent = randomComment;
            speechBubble.style.opacity = '1';
            speechBubble.style.transform = 'scale(1) translateY(0px)';
            speechBubble.style.transition = 'all 0.5s ease-out';
        }, 200);
        
        // みらいくんにクリックイベントを追加
        miraikunImg.onclick = () => {
            this.changeMiraikunComment();
        };
    }

    getTimeBasedComments(hour, minute) {
        // 朝（6:00-11:59）
        if (hour >= 6 && hour < 12) {
            return [
                'おはようございます！今日も頑張りましょう！',
                '朝の爽やかな空気、気持ちいいですね！',
                '今日も素晴らしい一日になりそうです♪',
                'コーヒーの香りが最高ですね☕',
                '早起きは三文の徳！素晴らしいスタートです！'
            ];
        }
        // 昼（12:00-13:59）
        else if (hour >= 12 && hour < 14) {
            return [
                'お昼ご飯は何食べようかなあ🍱',
                'ランチタイム！美味しいものを食べて午後も頑張りましょう！',
                'お昼休みはリフレッシュの時間ですね♪',
                '今日のランチは何ですか？楽しみです！',
                'お腹が空いたら集中できませんもんね😊'
            ];
        }
        // 午後前半（14:00-16:59）
        else if (hour >= 14 && hour < 17) {
            return [
                '座りっぱなしは体に良くないよ！こまめに給水とストレッチ！💪',
                '午後の集中タイム！でも適度な休憩も大切です',
                'ストレッチで血行を良くしましょう！',
                '水分補給はお忘れなく💧',
                '目を休めるために遠くを見てみてくださいね👀'
            ];
        }
        // 夕方（17:00-18:59）
        else if (hour >= 17 && hour < 19) {
            return [
                'もう少しで終業かな？お疲れ様！',
                '今日もお疲れ様でした！もう少しですね',
                '夕方の時間、お疲れ様です！',
                '一日の振り返りはいかがですか？',
                '明日の準備もお忘れなく！'
            ];
        }
        // 夜（19:00-23:59）
        else if (hour >= 19 || hour < 6) {
            return [
                'お疲れ様でした！今日も一日ありがとうございました',
                '夜遅くまでお疲れ様です。お体に気をつけて',
                'ゆっくり休んで、明日も頑張りましょう！',
                'お家に帰ったら温かいお風呂でリラックス♨️',
                '今日も素晴らしい一日でしたね！'
            ];
        }
        
        // デフォルト
        return ['今日も素晴らしい一日ですね！'];
    }

    changeMiraikunComment() {
        const now = new Date();
        const hour = now.getHours();
        const minute = now.getMinutes();
        
        // 特別なクリック時のコメント
        const specialComments = [
            'わあ！クリックしてくれてありがとう！😊',
            'みらいです！よろしくお願いします！',
            'ダッシュボードの調子はどうですか？',
            'お疲れ様です！頑張ってますね！',
            'データを見るのって楽しいですよね♪',
            '何かお困りのことはありませんか？',
            '今日の数字、いい感じですね！📊'
        ];
        
        const speechText = document.getElementById('speechText');
        const speechBubble = document.getElementById('speechBubble');
        
        const randomComment = specialComments[Math.floor(Math.random() * specialComments.length)];
        
        // アニメーション付きでコメント変更
        speechBubble.style.transform = 'scale(1.1)';
        speechBubble.style.borderColor = '#e74c3c';
        
        setTimeout(() => {
            speechText.textContent = randomComment;
            speechBubble.style.transform = 'scale(1)';
            speechBubble.style.borderColor = '#3498db';
        }, 200);
    }

    init() {
        this.updateTimestamp();
        this.updateAllMetrics();
        this.renderActiveInquiries();
        this.renderOperatorBreakdown();
        this.renderInquirySummary();
        this.renderQualityAdvice();
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
        // lastUpdated要素は削除されたため、コメント更新のみ実行
        this.updateMiraikunComment();
    }

    updateAllMetrics() {
        try {
            // 本日のお客様対応件数
            document.getElementById('totalContacts').textContent = this.data.totalContacts;
            document.getElementById('previousDayContacts').textContent = this.data.previousDayContacts;
            document.getElementById('weeklyAvgContacts').textContent = this.data.weeklyAvgContacts;
            
            // サービスレベル
            document.getElementById('serviceLevel').textContent = this.data.serviceLevel;
            document.getElementById('previousServiceLevel').textContent = this.data.previousServiceLevel + '%';
            document.getElementById('weeklyAvgServiceLevel').textContent = this.data.weeklyAvgServiceLevel + '%';
            this.updateServiceLevelProgress(this.data.serviceLevel);
            
            // 平均待ち時間
            document.getElementById('avgWaitTime').textContent = this.data.avgWaitTime;
            document.getElementById('previousAvgWaitTime').textContent = this.data.previousAvgWaitTime;
            document.getElementById('weeklyAvgWaitTime').textContent = this.data.weeklyAvgWaitTime;
            
            // 最長待ち時間
            document.getElementById('maxWaitTime').textContent = this.data.maxWaitTime;
            document.getElementById('previousMaxWaitTime').textContent = this.data.previousMaxWaitTime;
            document.getElementById('weeklyAvgMaxWaitTime').textContent = this.data.weeklyAvgMaxWaitTime;
        
            // オペレーター数
            document.getElementById('operatorCount').textContent = this.data.operatorCount;
            document.getElementById('totalOperators').textContent = this.data.totalOperators;
            this.updateOperatorChart();
            this.renderOperatorBreakdown();
        } catch (error) {
            console.error('Error updating metrics:', error);
        }
    }

    updateServiceLevelProgress(percentage) {
        const circle = document.getElementById('serviceProgress');
        const circumference = 2 * Math.PI * 45; // r=45
        const offset = circumference - (percentage / 100) * circumference;
        
        circle.style.strokeDasharray = circumference;
        circle.style.strokeDashoffset = offset;
        
        // 色を変更（90%以上で緑、80%以上で黄色、それ以下で赤）
        if (percentage >= 90) {
            circle.style.stroke = '#27ae60';
        } else if (percentage >= 80) {
            circle.style.stroke = '#f39c12';
        } else {
            circle.style.stroke = '#e74c3c';
        }
    }

    updateOperatorChart() {
        const total = this.data.totalOperators;
        const circumference = 2 * Math.PI * 45; // r=45
        
        // 各セグメントの割合を計算
        const activePercentage = (this.data.activeOperators / total) * 100;
        const waitingPercentage = (this.data.waitingOperators / total) * 100;
        const breakPercentage = (this.data.breakOperators / total) * 100;
        
        // ダッシュアレイで各セグメントを作成
        const activeLength = (activePercentage / 100) * circumference;
        const waitingLength = (waitingPercentage / 100) * circumference;
        const breakLength = (breakPercentage / 100) * circumference;
        
        // 各セグメントを配置
        const activeSegment = document.getElementById('activeSegment');
        const waitingSegment = document.getElementById('waitingSegment');
        const breakSegment = document.getElementById('breakSegment');
        
        // 対応中セグメント（0度から開始）
        activeSegment.style.strokeWidth = '8';
        activeSegment.style.strokeDasharray = `${activeLength} ${circumference - activeLength}`;
        activeSegment.style.strokeDashoffset = '0';
        
        // 待機中セグメント（対応中の後から開始）
        waitingSegment.style.strokeWidth = '8';
        waitingSegment.style.strokeDasharray = `${waitingLength} ${circumference - waitingLength}`;
        waitingSegment.style.strokeDashoffset = `-${activeLength}`;
        
        // 休憩中セグメント（待機中の後から開始）
        breakSegment.style.strokeWidth = '8';
        breakSegment.style.strokeDasharray = `${breakLength} ${circumference - breakLength}`;
        breakSegment.style.strokeDashoffset = `-${activeLength + waitingLength}`;
    }



    renderActiveInquiries() {
        const container = document.getElementById('activeInquiriesList');
        if (!container) {
            console.error('activeInquiriesList element not found');
            return;
        }
        
        container.innerHTML = '';
        
        if (!this.data.activeInquiries || this.data.activeInquiries.length === 0) {
            console.log('No active inquiries available');
            return;
        }
        
        this.data.activeInquiries.forEach(inquiry => {
            const item = document.createElement('div');
            item.className = 'active-inquiry-item';
            
            const priorityClass = inquiry.priority === '高' ? 'high' : 
                                inquiry.priority === '中' ? 'medium' : 'low';
            
            item.innerHTML = `
                <span class="inquiry-category">${inquiry.category}</span>
                <span class="inquiry-agent">${inquiry.agent}</span>
                <span class="inquiry-priority ${priorityClass}">${inquiry.priority}</span>
                <span class="inquiry-wait-time">${inquiry.waitTime}</span>
            `;
            
            container.appendChild(item);
        });
    }

    renderOperatorBreakdown() {
        const container = document.querySelector('.operator-breakdown');
        if (!container) {
            console.error('Operator breakdown container not found');
            return;
        }
        
        container.innerHTML = `
            <div class="breakdown-item">
                <div class="breakdown-left">
                    <span class="breakdown-dot active"></span>
                    <span class="breakdown-label">対応中</span>
                </div>
                <span class="breakdown-value" id="activeOperators">${this.data.activeOperators}</span>
            </div>
            <div class="breakdown-item">
                <div class="breakdown-left">
                    <span class="breakdown-dot waiting"></span>
                    <span class="breakdown-label">待機中</span>
                </div>
                <span class="breakdown-value" id="waitingOperators">${this.data.waitingOperators}</span>
            </div>
            <div class="breakdown-item">
                <div class="breakdown-left">
                    <span class="breakdown-dot break"></span>
                    <span class="breakdown-label">休憩中</span>
                </div>
                <span class="breakdown-value" id="breakOperators">${this.data.breakOperators}</span>
            </div>
            <div class="breakdown-item offline">
                <div class="breakdown-left">
                    <span class="breakdown-dot offline"></span>
                    <span class="breakdown-label">オフライン</span>
                </div>
                <span class="breakdown-value" id="offlineOperators">${this.data.offlineOperators}</span>
            </div>
        `;
    }

    renderInquirySummary() {
        const container = document.getElementById('inquirySummaryData');
        if (!container) {
            console.error('Inquiry summary container not found');
            return;
        }
        
        container.innerHTML = '';
        
        // 上位5つのカテゴリのみ表示
        const topCategories = [...this.data.inquiryData].slice(0, 5);
        
        topCategories.forEach(item => {
            const summaryItem = document.createElement('div');
            summaryItem.className = 'summary-item';
            
            summaryItem.innerHTML = `
                <span class="summary-category">${item.category}</span>
                <span class="summary-count">${item.count}</span>
                <span class="summary-percentage">${item.percentage}%</span>
            `;
            
            container.appendChild(summaryItem);
        });
    }

    renderQualityAdvice() {
        const container = document.getElementById('adviceContainer');
        if (!container) {
            console.error('Quality advice container not found');
            return;
        }
        
        const adviceData = [
            {
                priority: 'high',
                icon: '🎯',
                title: '応答時間の短縮',
                content: '平均応答時間が目標値を上回っています。よくある質問のテンプレート活用により、効率的な対応が可能です。',
                action: '→ FAQテンプレートの整備',
                metrics: [
                    { label: '現在', value: '02:51' },
                    { label: '目標', value: '02:30' }
                ]
            },
            {
                priority: 'medium',
                icon: '📚',
                title: 'スキルアップ研修',
                content: '技術サポートの問合せが増加傾向です。チーム全体のスキル向上により、解決率の改善が期待できます。',
                action: '→ 技術研修の実施',
                metrics: [
                    { label: '解決率', value: '87%' },
                    { label: '目標', value: '92%' }
                ]
            },
            {
                priority: 'low',
                icon: '📊',
                title: 'データ分析の活用',
                content: '問合せパターンの分析により、予防的なサポートが可能です。定期的なデータレビューを推奨します。',
                action: '→ 週次データレビュー',
                metrics: [
                    { label: '予防率', value: '23%' },
                    { label: '目標', value: '35%' }
                ]
            },
            {
                priority: 'medium',
                icon: '👥',
                title: 'チーム連携の強化',
                content: 'チーム間での情報共有を改善することで、問合せ対応の一貫性と効率性が向上します。',
                action: '→ 定期ミーティング実施',
                metrics: [
                    { label: '共有率', value: '68%' },
                    { label: '目標', value: '85%' }
                ]
            },
            {
                priority: 'low',
                icon: '🔧',
                title: 'システム最適化',
                content: '業務システムのレスポンス改善により、オペレーターの作業効率が向上し、顧客満足度の向上が期待できます。',
                action: '→ システム性能改善',
                metrics: [
                    { label: '応答速度', value: '2.3秒' },
                    { label: '目標', value: '1.8秒' }
                ]
            }
        ];
        
        container.innerHTML = '';
        
        adviceData.forEach(advice => {
            const adviceItem = document.createElement('div');
            adviceItem.className = 'advice-item';
            
            const metricsHtml = advice.metrics.map(metric => 
                `<div class="advice-metric">
                    <div class="advice-metric-value">${metric.value}</div>
                    <div class="advice-metric-label">${metric.label}</div>
                </div>`
            ).join('');
            
            adviceItem.innerHTML = `
                <div class="advice-priority ${advice.priority}">
                    ${advice.priority === 'high' ? '高優先度' : advice.priority === 'medium' ? '中優先度' : '低優先度'}
                </div>
                <div class="advice-title">
                    <span class="advice-icon">${advice.icon}</span>
                    <span>${advice.title}</span>
                </div>
                <div class="advice-content">${advice.content}</div>
                <div class="advice-action">${advice.action}</div>
                <div class="advice-metrics">${metricsHtml}</div>
            `;
            
            container.appendChild(adviceItem);
        });
    }

    // リアルタイム更新のシミュレーション
    startRealTimeUpdates() {
        setInterval(() => {
            this.updateTimestamp();
            this.simulateDataChanges();
            this.updateAllMetrics();
            this.renderActiveInquiries();
            this.renderInquirySummary();
            this.renderQualityAdvice();
        }, 5000); // 5秒ごとに更新
        
        // みらいくんのコメントを定期的に更新（30秒ごと）
        setInterval(() => {
            this.updateMiraikunComment();
        }, 30000);

        // より頻繁な小さな変更
        setInterval(() => {
            this.microUpdates();
        }, 1000); // 1秒ごとに小さな更新
    }

    simulateDataChanges() {
        // お客様対応件数を時々増加
        if (Math.random() < 0.3) {
            this.data.totalContacts += Math.floor(Math.random() * 3) + 1;
        }

        // 前営業日と先週平均も少し変動（参考値として）
        if (Math.random() < 0.1) {
            this.data.previousDayContacts += Math.floor((Math.random() - 0.5) * 4);
            this.data.weeklyAvgContacts += Math.floor((Math.random() - 0.5) * 3);
            
            // 範囲制限
            this.data.previousDayContacts = Math.max(180, Math.min(250, this.data.previousDayContacts));
            this.data.weeklyAvgContacts = Math.max(170, Math.min(230, this.data.weeklyAvgContacts));
        }

        // サービスレベルを小さく変動
        const serviceLevelChange = (Math.random() - 0.5) * 2;
        this.data.serviceLevel = Math.max(85, Math.min(98, this.data.serviceLevel + serviceLevelChange));
        this.data.serviceLevel = Math.round(this.data.serviceLevel * 10) / 10;

        // サービスレベルの比較データも変動
        if (Math.random() < 0.05) {
            this.data.previousServiceLevel += Math.floor((Math.random() - 0.5) * 3);
            this.data.weeklyAvgServiceLevel += Math.floor((Math.random() - 0.5) * 2);
            
            this.data.previousServiceLevel = Math.max(85, Math.min(95, this.data.previousServiceLevel));
            this.data.weeklyAvgServiceLevel = Math.max(80, Math.min(92, this.data.weeklyAvgServiceLevel));
        }

        // 待ち時間を変動
        this.updateWaitTimes();

        // オペレーター数を変動
        this.updateOperatorData();

        // 問合せデータを更新
        this.updateInquiryData();
        
        // 対応中問合せデータを更新
        this.updateActiveInquiriesData();
    }

    updateWaitTimes() {
        // 平均待ち時間
        const avgMinutes = Math.floor(Math.random() * 5) + 1;
        const avgSeconds = Math.floor(Math.random() * 60);
        this.data.avgWaitTime = `${avgMinutes.toString().padStart(2, '0')}:${avgSeconds.toString().padStart(2, '0')}`;

        // 最長待ち時間
        const maxMinutes = Math.floor(Math.random() * 15) + 5;
        const maxSecondsVal = Math.floor(Math.random() * 60);
        this.data.maxWaitTime = `${maxMinutes.toString().padStart(2, '0')}:${maxSecondsVal.toString().padStart(2, '0')}`;

        // 比較データも時々更新
        if (Math.random() < 0.08) {
            // 前営業日の平均待ち時間
            const prevAvgMinutes = Math.floor(Math.random() * 4) + 2;
            const prevAvgSeconds = Math.floor(Math.random() * 60);
            this.data.previousAvgWaitTime = `${prevAvgMinutes.toString().padStart(2, '0')}:${prevAvgSeconds.toString().padStart(2, '0')}`;

            // 先週平均の平均待ち時間
            const weeklyAvgMinutes = Math.floor(Math.random() * 4) + 2;
            const weeklyAvgSeconds = Math.floor(Math.random() * 60);
            this.data.weeklyAvgWaitTime = `${weeklyAvgMinutes.toString().padStart(2, '0')}:${weeklyAvgSeconds.toString().padStart(2, '0')}`;

            // 前営業日の最長待ち時間
            const prevMaxMinutes = Math.floor(Math.random() * 10) + 8;
            const prevMaxSeconds = Math.floor(Math.random() * 60);
            this.data.previousMaxWaitTime = `${prevMaxMinutes.toString().padStart(2, '0')}:${prevMaxSeconds.toString().padStart(2, '0')}`;

            // 先週平均の最長待ち時間
            const weeklyMaxMinutes = Math.floor(Math.random() * 12) + 10;
            const weeklyMaxSeconds = Math.floor(Math.random() * 60);
            this.data.weeklyAvgMaxWaitTime = `${weeklyMaxMinutes.toString().padStart(2, '0')}:${weeklyMaxSeconds.toString().padStart(2, '0')}`;
        }
    }

    updateOperatorData() {
        // 小さな変動でリアリティを演出
        if (Math.random() < 0.15) {
            // 対応中のオペレーターを変動
            const activeChange = Math.floor((Math.random() - 0.5) * 4);
            this.data.activeOperators = Math.max(25, Math.min(40, this.data.activeOperators + activeChange));
            
            // 待機中のオペレーターを変動
            const waitingChange = Math.floor((Math.random() - 0.5) * 3);
            this.data.waitingOperators = Math.max(10, Math.min(25, this.data.waitingOperators + waitingChange));
            
            // 休憩中のオペレーターを変動
            const breakChange = Math.floor((Math.random() - 0.5) * 2);
            this.data.breakOperators = Math.max(2, Math.min(12, this.data.breakOperators + breakChange));
            
            // 合計を再計算（オフラインは残り）
            this.data.operatorCount = this.data.activeOperators + this.data.waitingOperators + this.data.breakOperators;
            this.data.offlineOperators = this.data.totalOperators - this.data.operatorCount;
        }
    }

    updateInquiryData() {
        this.data.inquiryData.forEach(item => {
            // 件数をランダムに変更
            const change = Math.floor((Math.random() - 0.5) * 6);
            item.count = Math.max(10, item.count + change);
        });

        // 合計を計算
        const total = this.data.inquiryData.reduce((sum, item) => sum + item.count, 0);
        
        // パーセンテージを再計算
        this.data.inquiryData.forEach(item => {
            item.percentage = Math.round((item.count / total) * 100);
            
            // ステータスを更新
            if (item.percentage >= 30) {
                item.status = 'high';
            } else if (item.percentage >= 20) {
                item.status = 'medium';
            } else {
                item.status = 'low';
            }
        });
    }

    updateActiveInquiriesData() {
        // 対応中問合せの待ち時間を更新
        this.data.activeInquiries.forEach(inquiry => {
            // 待ち時間をランダムに変更
            const currentMinutes = parseInt(inquiry.waitTime.split(':')[0]);
            const currentSeconds = parseInt(inquiry.waitTime.split(':')[1]);
            
            const totalSeconds = currentMinutes * 60 + currentSeconds;
            const newTotalSeconds = Math.max(30, totalSeconds + Math.floor((Math.random() - 0.3) * 60));
            
            const newMinutes = Math.floor(newTotalSeconds / 60);
            const newSeconds = newTotalSeconds % 60;
            
            inquiry.waitTime = `${newMinutes.toString().padStart(2, '0')}:${newSeconds.toString().padStart(2, '0')}`;
        });

        // 時々新しい問合せが追加されたり、完了したりする
        if (Math.random() < 0.2) {
            const categories = ["技術サポート", "請求関連", "新規開通", "契約内容変更", "支払方法変更", "停電対応"];
            const agents = ["田中", "佐藤", "鈴木", "山田", "高橋", "伊藤", "渡辺"];
            const priorities = ["高", "中", "低"];
            
            if (this.data.activeInquiries.length < 7 && Math.random() < 0.6) {
                // 新しい問合せを追加
                this.data.activeInquiries.push({
                    category: categories[Math.floor(Math.random() * categories.length)],
                    agent: agents[Math.floor(Math.random() * agents.length)],
                    priority: priorities[Math.floor(Math.random() * priorities.length)],
                    waitTime: "00:15",
                    status: "対応中"
                });
            } else if (this.data.activeInquiries.length > 3) {
                // 問合せを完了（削除）
                this.data.activeInquiries.splice(Math.floor(Math.random() * this.data.activeInquiries.length), 1);
            }
        }
    }

    microUpdates() {
        // 小さなUIの更新（点滅効果など）
        const metrics = document.querySelectorAll('.metric-period');
        metrics.forEach(metric => {
            if (Math.random() < 0.1) {
                metric.style.animation = 'none';
                setTimeout(() => {
                    metric.style.animation = 'pulse 2s infinite';
                }, 50);
            }
        });
    }

    // トレンドアニメーション
    animateTrend(element, isPositive) {
        element.style.transform = 'scale(1.1)';
        element.style.color = isPositive ? '#27ae60' : '#e74c3c';
        
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 200);
    }
}

// アラート機能
class AlertSystem {
    constructor(dashboard) {
        this.dashboard = dashboard;
        this.thresholds = {
            serviceLevel: 85,
            maxWaitTime: 600, // 10分（秒）
            operatorUtilization: 90
        };
    }

    checkAlerts() {
        const alerts = [];

        // サービスレベルチェック
        if (this.dashboard.data.serviceLevel < this.thresholds.serviceLevel) {
            alerts.push({
                type: 'warning',
                message: `サービスレベルが${this.thresholds.serviceLevel}%を下回りました`,
                value: this.dashboard.data.serviceLevel
            });
        }

        // オペレーター稼働率チェック
        const utilization = (this.dashboard.data.operatorCount / this.dashboard.data.totalOperators) * 100;
        if (utilization > this.thresholds.operatorUtilization) {
            alerts.push({
                type: 'critical',
                message: 'オペレーター稼働率が高すぎます',
                value: Math.round(utilization)
            });
        }

        return alerts;
    }

    showAlert(alert) {
        // 簡単なアラート表示（実装に応じてカスタマイズ可能）
        console.warn(`${alert.type.toUpperCase()}: ${alert.message} (${alert.value})`);
        
        // ダッシュボードにバッジを表示することも可能
        const alertBadge = document.createElement('div');
        alertBadge.className = `alert-badge ${alert.type}`;
        alertBadge.textContent = '!';
        alertBadge.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            background: ${alert.type === 'critical' ? '#e74c3c' : '#f39c12'};
            animation: pulse 1s infinite;
            z-index: 1000;
        `;
        
        document.body.appendChild(alertBadge);
        
        setTimeout(() => {
            alertBadge.remove();
        }, 5000);
    }
}

// ページ読み込み時に初期化
document.addEventListener('DOMContentLoaded', () => {
    try {
        console.log('Initializing dashboard...');
        const dashboard = new RealTimeDashboard();
        const alertSystem = new AlertSystem(dashboard);
        console.log('Dashboard initialized successfully');
        
        // 定期的にアラートをチェック
        setInterval(() => {
            const alerts = alertSystem.checkAlerts();
            alerts.forEach(alert => alertSystem.showAlert(alert));
        }, 10000); // 10秒ごとにチェック
        
        // ウィンドウサイズ変更時の対応
        window.addEventListener('resize', () => {
            dashboard.updateAllMetrics();
        });
        
        // ページの可視性変更時の対応
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                dashboard.updateTimestamp();
            }
        });
    } catch (error) {
        console.error('Failed to initialize dashboard:', error);
    }
});

// エクスポート（モジュール使用時）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { RealTimeDashboard, AlertSystem };
}
