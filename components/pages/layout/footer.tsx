import styles from './footer.module.css';

export default function FooterComponent() {
    return (<footer className={styles['footer']}>
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 text-xs text-muted-foreground sm:flex-row">
          <div>© {new Date().getFullYear()} Home Budget Manager. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Support</a>
          </div>
        </div>
      </footer>
  );
}