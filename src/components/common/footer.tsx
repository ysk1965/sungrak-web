import Link from "next/link";
import { MapPin, Phone, Clock } from "lucide-react";
import { Container } from "./container";

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-white">
      <Container>
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {/* 교회 정보 */}
            <div className="lg:col-span-2">
              <h3 className="text-xl font-bold mb-4">성락교회</h3>
              <p className="text-neutral-400 mb-6 leading-relaxed">
                신실한 헌신, 긍휼한 아낌
                <br />
                Sincere Devotion, Compassionate Fellowship
              </p>
              <div className="space-y-3 text-sm text-neutral-400">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="mt-0.5 shrink-0" />
                  <span>서울시 구로구 신도림로 56-24</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={18} className="shrink-0" />
                  <span>070-7300-6200</span>
                </div>
              </div>
            </div>

            {/* 예배 시간 */}
            <div>
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <Clock size={18} />
                예배 시간
              </h4>
              <ul className="space-y-2 text-sm text-neutral-400">
                <li>
                  <span className="text-neutral-300">주일 1부</span> 오전 7:00
                </li>
                <li>
                  <span className="text-neutral-300">주일 2부</span> 오전 9:30
                </li>
                <li>
                  <span className="text-neutral-300">주일 3부</span> 오전 11:30
                </li>
                <li>
                  <span className="text-neutral-300">수요예배</span> 오후 7:30
                </li>
                <li>
                  <span className="text-neutral-300">새벽기도</span> 오전 5:00
                </li>
              </ul>
            </div>

            {/* 바로가기 */}
            <div>
              <h4 className="font-semibold mb-4">바로가기</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/about"
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    교회소개
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sermons"
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    설교 듣기
                  </Link>
                </li>
                <li>
                  <Link
                    href="/newcomer"
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    새가족 안내
                  </Link>
                </li>
                <li>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    YouTube
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-neutral-800 py-6">
          <p className="text-center text-sm text-neutral-500">
            © {new Date().getFullYear()} 성락교회. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
