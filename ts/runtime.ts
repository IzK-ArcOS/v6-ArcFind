import { AppRuntime } from "$ts/apps/runtime";
import { Process } from "$ts/process";
import { Search } from "$ts/search";
import { GetFilesystemTree } from "$ts/server/fs/file/tree";
import { Store } from "$ts/writable";
import type { App, AppMutator } from "$types/app";
import { PartialArcFile } from "$types/fs";
import { SearchItem } from "$types/search";

export class Runtime extends AppRuntime {
  public Query = Store<string>("");
  public Tree = Store<PartialArcFile[]>([]);
  public Results = Store<SearchItem[]>([]);
  public SelectionIndex = Store<number>(0);

  constructor(app: App, mutator: AppMutator, process: Process) {
    super(app, mutator, process);

    process.accelerator.store.push({
      key: "escape",
      action() {
        process.handler.kill(process.pid, true);
      },
    });

    this._init();
  }

  private async _init() {
    this.Tree.set(await GetFilesystemTree());

    this.Query.subscribe(async (v) => {
      const results = await Search(v);

      this.Results.set(results.map((r) => r.item));
    });
  }

  public async Trigger(result: SearchItem) {
    await result.action(result);

    this.closeApp();
  }

  public async Submit() {
    const results = this.Results.get();
    const index = this.SelectionIndex.get();

    if (!results.length) return;

    this.Query.set("");

    this.Trigger(results[index == -1 ? 0 : index]);
  }

  public MutateIndex(e: KeyboardEvent) {
    const key = e.key.toLowerCase();
    const results = this.Results.get();

    let index = this.SelectionIndex.get();

    if (!results.length) return (index = -1);

    if (key == "enter") return this.Submit();

    let length = results.length - 1;

    switch (key) {
      case "arrowup":
        index--;
        if (index < 0) index = length;
        break;

      case "arrowdown":
        index++;
        if (index > length) index = 0;
        break;
    }

    this.SelectionIndex.set(index);
  }
}
